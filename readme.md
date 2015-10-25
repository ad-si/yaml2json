# YAML2JSON

A stream transformer to convert YAML to JSON.


## Installation

```sh
npm install --save @adius/yaml2json
```


## Usage

```js
import Yaml2json from '@adius/yaml2json'

fs
	.createReadableStream('path/to/some/file.yaml')
	.pipe(new Yaml2json)
	.pipe(process.stdout)
```
