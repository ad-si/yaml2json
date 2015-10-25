import stream from 'stream'
import yaml from 'js-yaml'

export default class Yaml2json extends stream.Transform {

	constructor (
		{writableObjectMode, readableObjectMode} = {
			writableObjectMode: false,
			readableObjectMode: true
		}
	) {
		super({writableObjectMode, readableObjectMode})

		this.internalBuffer = new Buffer(0)
	}

	_flush  (done) {
		let json = yaml.safeLoad(this.internalBuffer.toString())

		if (this.readableObjectMode)
			this.push(json)
		else
			this.push(JSON.stringify(json, null, 4))

		done()
	}

	_transform (chunk, encoding, done) {
		this.internalBuffer = Buffer.concat([this.internalBuffer, chunk])
		done()
	}
}
