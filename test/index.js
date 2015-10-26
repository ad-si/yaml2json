import fs from 'fs'
import path from 'path'
import stream from 'stream'

import Yaml2json from '../source/index'


fs
	.createReadStream(path.resolve(__dirname, './test.yaml'))
	.pipe(new Yaml2json)
	.pipe(new stream.Transform({
		writableObjectMode: true,
		transform: (chunk, encoding, done) =>
			done(null, JSON.stringify(chunk) + '\n')
	}))
	//.pipe(process.stdout)
