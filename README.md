# NPMS App [![Build Status](https://travis-ci.org/NERC-CEH/npms-app.svg?branch=master)](https://travis-ci.org/NERC-CEH/npms-app)

The National Plant Monitoring Scheme (NPMS) is a new habitat-based plant monitoring
scheme designed by BSBI, CEH, Plantlife and JNCC. The aim is to collect data to
provide an annual indication of changes in plant abundance and diversity.

## Contribution

Think you've found a bug or have a new feature to suggest?
[Let us know!](https://github.com/NERC-CEH/npms-app/issues)

In the spirit of open source software development, we'd love for you to contribute
to our source code and make it better than it is today! To help you get started
and before you jump into writing code, please read the contribution guidelines
thoroughly:

Contribution guidelines:
[CONTRIBUTING.md](https://github.com/NERC-CEH/npms-app/blob/master/CONTRIBUTING.md)


## Questions

If you have any questions, please feel free to ask on the
[NPMS forum](http://www.npms.org.uk/forum).


## Configuration

App configuration is hosted in `config/config.js`. **Note:** it should be done
 *before* building the code.


## Building

- Install [NodeJS](http://nodejs.org/)
- Install SASS 

```bash
gem install sass
```

- Get a copy of the code by running:

```bash
git clone git://github.com/NERC-CEH/npms-app.git
```

- Enter the `npms-app` directory and install the npm build dependencies:

```bash
cd npms-app && npm install
```


### Cordova mobile app

- Build the project:

```bash
grunt cordova
```

- Update Cordova project with new web pages (replaces the www)

```bash
grunt cordova:update
```

### Web app

If you are building for the web platform only:

`Production`

```bash
grunt
```

`Development`

```bash
grunt dev
```

This will create a `dist` folder with the app code and its dependencies.


## Running app locally

- [Express](http://expressjs.com/) framework is provided for a quick
launch of a web server.

```bash
node config/server.js
```

- Open the app on a browser [http://localhost:8000](http://localhost:8000)


## Authors

[Karolis Kazlauskis](https://github.com/kazlauskis)


## Copyright and license

Code copyright 2017 Centre for Ecology & Hydrology.
Code released under the [GNU GPL v3 license](LICENSE).
