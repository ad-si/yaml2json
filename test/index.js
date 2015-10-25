import fs from 'fs'
import path from 'path'
import stream from 'stream'

import Yaml2json from '../source/index'


fs
	.createReadStream(path.resolve(__dirname, './test.yaml'))
	.pipe(new Yaml2json)
	.pipe(new stream.Transform({
		transform: (chunk, encoding, done) => done(null, chunk)
	}))
	//.pipe(process.stdout)
