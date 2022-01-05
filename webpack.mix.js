/* eslint-disable @typescript-eslint/no-var-requires */
let mix = require('laravel-mix')
const fs = require('fs')

require('./mix-eta')

const data = JSON.parse(fs.readFileSync('tests/src/data.json', 'utf8'))
mix.eta('tests/src/index.eta', 'tests/public', data)
