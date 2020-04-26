#! /usr/bin/env node

const fs = require('fs')
const stream = require('stream')

const Yaml2json = require('./source/index.js')

process.stdin
  .pipe(new Yaml2json)
  .pipe(new stream.Transform({
    writableObjectMode: true,
    transform: (chunk, encoding, done) =>
      done(null, JSON.stringify(chunk) + '\n')
  }))
  .pipe(process.stdout)
  .on('error', error => { throw error })
