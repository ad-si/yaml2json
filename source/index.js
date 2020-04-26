const stream = require('stream')
const yaml = require('js-yaml')

module.exports = class Yaml2json extends stream.Transform {

  constructor (
    {
      writableObjectMode = false,
      readableObjectMode = true,
    } = {}
  ) {
    super({writableObjectMode, readableObjectMode})

    this.internalBuffer = new Buffer.alloc(0)
  }

  _flush  (done) {
    let json = yaml.safeLoad(this.internalBuffer.toString())

    if (this._readableState.objectMode) {
      this.push(json)
    }
    else {
      this.push(JSON.stringify(json) + '\n')
    }

    done()
  }

  _transform (chunk, encoding, done) {
    this.internalBuffer = Buffer.concat([this.internalBuffer, chunk])
    done()
  }
}
