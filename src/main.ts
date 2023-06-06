import * as core from '@actions/core';
import * as exec from "@actions/exec";
import * as io from "@actions/io";
import * as tc from "@actions/tool-cache";
import * as os from 'os';
import fs from 'fs';
const https = require('https');

function getPlatform(): string {
    switch (process.platform) {
        case 'linux': return 'linux';
        case 'darwin': return 'darwin';
        case 'win32': return 'windows';
    }
    return 'linux';  /* Default: linux */
}

async function getLatestTag() {
    const url = 'https://api.github.com/repos/lem-project/lem/tags'
    const options = {
        host: 'api.github.com',
        method: 'GET',
        headers: {'user-agent': 'node.js'},
    };

    return new Promise((resolve) => {
        let data = ''
        let request = https.request(url, options, function(response: any){
            response.on("data", function(chunk: any){
                data += chunk.toString('utf8');
            });

            response.on("end", function(){
                let json = JSON.parse(data);
                resolve(json[0].name);
            });
        });
        request.end();
    });
}

async function run(): Promise<void> {
    try {
        const PATH = process.env.PATH;

        const home = os.homedir();
        const tmp = os.tmpdir();

        const latestVersion = await getLatestTag();
        const inputVersion = core.getInput("version");
        const version = (inputVersion == 'snapshot') ? latestVersion : "v" + inputVersion;
        const platform = getPlatform();

        const archiveName = `lem-${platform}-${version}.zip`;   // lem-windows-v2.0.0.zip

        core.startGroup("Fetch Lem");
        {
            let downloadUrl = `https://github.com/lem-project/lem/releases/download/${version}/${archiveName}`;

            await exec.exec('curl', [
                '-L',
                downloadUrl,
                '-o',
                `${tmp}/${archiveName}`
            ]);

            fs.mkdirSync(`${tmp}/lem-${version}`);
            await exec.exec('unzip', [`${tmp}/${archiveName}`, '-d', `${tmp}/lem-${version}`]);
            const options = { recursive: true, force: false };
            await io.mv(`${tmp}/lem-${version}`, `${home}/lem-${version}`, options);
            core.addPath(`${home}/lem-${version}`);
        }
        core.endGroup();

        /* Chmod so let the operating system know it's executable! */
        if (platform != 'win') {
            core.startGroup("Chmod if necessary");
            await exec.exec(`chmod -R 777 ${home}/lem-${version}`);
            core.endGroup();
        }

        // show Lem version
        await exec.exec('lem', ['--version']);
    } catch (error) {
        let errorMsg = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        core.setFailed(errorMsg);
    }
}

run();
