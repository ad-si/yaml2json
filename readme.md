# YAML2JSON

A stream transformer to convert YAML to JSON.


## Installation

```sh
npm install --save @adius/yaml2json
```


## Usage

```js
const Yaml2json = require('@adius/yaml2json')

fs
  .createReadStream('path/to/some/file.yaml')
  .pipe(new Yaml2json)
  .pipe(new stream.Transform({
    writableObjectMode: true,
    transform: (chunk, encoding, done) =>
      done(null, JSON.stringify(chunk) + '\n')
  }))
  .pipe(process.stdout)
  .on('error', console.error)
```
