const assert = require('assert').strict
const fs = require('fs')
const path = require('path')
const stream = require('stream')

const StreamTester = require('streamtester')

const Yaml2json = require('../source/index')

const streamTester = new StreamTester({
  test: chunk => {
    assert.strictEqual(
      JSON.parse(chunk.toString()).YAML,
      'YAML Ain\'t Markup Language',
    )
  }
})


fs
  .createReadStream(path.resolve(__dirname, './test.yaml'))
  .pipe(new Yaml2json)
  .pipe(new stream.Transform({
    writableObjectMode: true,
    transform: (chunk, encoding, done) =>
      done(null, JSON.stringify(chunk) + '\n')
  }))
  .pipe(streamTester)
  .on('error', error => { throw error })
