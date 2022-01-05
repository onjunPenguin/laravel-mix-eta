# Laravel-Mix-Eta
Laravel Mix extension for [Eta](https://eta.js.org/).
Eta is very similar to [ejs](https://ejs.co/), but supports templates and has some [differences](https://eta.js.org/docs/about/eta-vs-ejs).

## Installation
```
npm i -D mix-eta
```

# Usage

Use `mix.eta()` with your `webpack.mix.js`. You can also add object data.

```
require('mix-eta');

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

mix.eta('src/**/[^_]*.eta', 'dest/', data /* Option */);
// mix.eta(GlobPattern, DestDir, Object?)
```

For more information on how to use the template, please read the [Eta documentation](https://eta.js.org/docs).
