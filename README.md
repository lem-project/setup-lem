[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/release/lem-project/setup-lem.svg?logo=github)](https://github.com/lem-project/setup-lem/releases/latest)

<a href="#"><img align="right" src="https://raw.githubusercontent.com/Shinmera/lem-icon/gh-pages/icon-blue.svg" alt="Lem"></a>

# setup-lem
> Install Lem for GitHub Actions workflow

[![CI](https://github.com/lem-project/setup-lem/actions/workflows/test.yml/badge.svg)](https://github.com/lem-project/setup-lem/actions/workflows/test.yml)
[![Build](https://github.com/lem-project/setup-lem/actions/workflows/build.yml/badge.svg)](https://github.com/lem-project/setup-lem/actions/workflows/build.yml)

## 🔨 Usage

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    ...

    # Install Lem
    - uses: jcs090218/setup-lem@master
      with:
        version: 'snapshot'

    ...
```

This example is testing your package in below environment.

* Lem: `snapshot` (latest)

### Inputs

| name    | value  | default  | description                                                                                  |
|:--------|:-------|:---------|:---------------------------------------------------------------------------------------------|
| version | string | snapshot | The version of Lem to install, e.g. "2.0.0", or "snapshot" for a recent development version. |

## License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
