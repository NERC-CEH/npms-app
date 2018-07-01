# Issues


## Reporting a Bug
1. Update to the most recent app version if possible. We may have already
fixed your bug.

2. Search for similar issues. It's possible somebody has encountered
this bug already.

The more information you provide, the easier it is for us to validate that
there is a bug and the faster we'll be able to take action. In order to best help out with bugs, we need to know the following information in your bug submission:

* **App version**: App Menu -> About (bottom of the page)
* Your **device model** eg. Samsung Galaxy S7 
* The **operating system** on the device eg. Android 4.4.1, iOS 9.2.1


## Requesting a Feature

1. Search for existing feature requests.

2. Provide a clear and detailed explanation of the feature you want and why
it's important to add.

3. After discussing the feature you may choose to attempt a Pull Request. If
you're at all able, start writing some code, that will speed the process
along.


# Development

Here is some important information about the project workings and its development.

The app is written in [ECMAScript 2015](http://es6-features.org) (**ES6**) the 
new Javascript standard. Unfortunately, not all of the browsers support this yet,
so the code is transpiled to ES5 using Babel compiler. To see what ES6 features Babel
transpiles check the [Babel Docs](https://babeljs.io/docs/learn-es2015).

The code is packaged up by [Webpack](https://webpack.github.io) module bundler. It
takes care of passing the ES6 code through Babel and pulling the code together
to make an *dist/main/app.js* file that is loaded in the *index.html*.


## Environmental Variables

The app's build process requires certain environmental variables to be present. 
If any missing then the build will fail. If you want to bypass this and force the build you
can use `APP_FORCE=true` set to your environment. Alternatively, you can
set all your vars to an `.env` file in the root dir.

## Style Guide

The code is *[eslint](http://eslint.org)*'ed, to detect issues early on, so it is 
important to lint your code before commiting the changes to the repository.
To do that you can run eslint command line tool or choose one of the numerous 
eslint plugins for your IDE.

Please see the `.eslintrc` file for rules in use.

## Branching

Please use `feature/NAME`, `hotfix/VERSION`. 
Once finished please create a pull request into `master`.

# Architecture

The app is designed around [Backbone](backbone.org) framework that helps to 
structure the code
into a MV* like pattern. Backbone is very open on how you build your app and is also
missing some useful *View* functionality that other frameworks like Angular or Ember
provide, so we use Backbone plugin [Marionette](marionettejs.org) to extend and 
improve the Backbone Views. Since Backbone doesn't provide a controller - 
the logic is shared between Views (making them somewhat presenter like), 
we have introduced simple controllers which hold the internal app logic. 

## Components folder

* App **components** - a group of page-like components (sub components) providing similar
 functionality eg. records, mapping, information pages. 
 Components should work independently between each other, so that for example mapping should
 have no dependencies on record components.

* App **sub components** - page-like components. For example *records* component 
includes: list, edit, attribute, show sub components.  

* Common files or pages between components are placed in *common* folder.

* Common page level components (common sub components) are placed in *pages* 
folder within common folder.

## Other

*App* object holds the app component APIs;

For clarity reasons, Libraries and Helper code must be imported as capitalized 
variables: App, Backbone, Device, GPS etc.


# Continous Integration and Testing

New functionality should be provided with tests in *\_\_tests\_\_* folder next to the 
code that is being tested. It is important to test any new code on as many devices
as possible so for that we are using Travis CI. It detects new repository 
commits and runs the app tests on 20+ browsers using Sauce Labs. To see the build
test output visit [Travis project builds](https://travis-ci.org/NERC-CEH/npms-app).

- To run the tests locally install Chromium browser and run:

```bash
npm test
```

- Auto watch:

```bash
npm run test:watch
```

- Generate coverage report:

```bash
npm run test:coverage
```

# Cordova

## iOS 

Use XCode to build and upload

## Android

Run and upload binaries from cordova/dist
```bash
npm run build:cordova:android
```


# Interaction with the NPMS site

The mobile app has few interaction points with its backend - the NPMS site. 
All of the communication to the site is done through the site installed Indicia API module.
The module requires every request to include the api key (`x-api-key` header) for authorisation.

## User 

#### Registration

`POST http://www.npms.org.uk/api/v1/users/`

```JSON
{"data":{"type":"users","email":"karolis@kazlauskis.com","firstname":"Karolis","secondname":"Kazlauskis","password":"mypass","password-confirm":"mypass","terms-agree":true}}
```

#### Login

User is authenticated using Basic auth

`GET http://www.npms.org.uk/api/v1/users/USERID`


#### Password reset

This requires PUT request enabled on the website

`PUT http://www.npms.org.uk/api/v1/users/USERID`

```JSON
{"data":{"type":"users","password":" "}}
```

## Recording
The warehouse attribute values used in the app can be found here in this file:
https://github.com/NERC-CEH/npms-app/blob/master/src/common/config/config.js#L76

A sample record submission from the app to the Indicia API module looks like this:

`POST http://www.npms.org.uk/api/v1/samples`

```JSON
{
  "data": {
    "external_key": "92137472-df7b-48aa-b30f-a6fd922168d0",
    "survey_id": 154,
    "input_form": "inventory-recording-form-2015",
    "fields": {
      "215": 1818,
      "216": 1821,
      "219": 2,
      "220": 1,
      "221": 3,
      "222": 1,
      "223": 2,
      "224": "none",
      "225": [
        1801,
        1804,
        1806,
        1807
      ],
      "273": 2399,
      "403": 3336,
      "404": 3336,
      "405": 3337,
      "408": 3338,
      "565": 4876,
      "date": "1\/7\/2018",
      "entered_sref_system": "OSGB",
      "recorder_names": "Karolis Kazlauskis",
      "level": "inventory",
      "565:4876": 4880,
      "entered_sref": "SU7253398593",
      "location_id": 158874,
      "comment": "Some comment"
    },
    "media": [],
    "occurrences": [
      {
        "external_key": "f8e50c06-2bb3-4795-a65d-fdd1675154d0",
        "fields": {
          "214": 3335,
          "taxa_taxon_list_id": 239577
        },
        "media": []
      },
      {
        "external_key": "988f402e-8fa6-45b8-8887-108d2e517893",
        "fields": {
          "214": 3336,
          "taxa_taxon_list_id": 56795
        },
        "media": []
      }
    ],
    "samples": [],
    "type": "samples"
  }
}
```

## User plots report

Currently shows only user owned plots - the report's plots that return `my_plot = 'YES'`

`GET http://www.npms.org.uk/api/v1/reports/reports_for_prebuilt_forms/Splash/get_my_squares_and_plots.xml`

```
core_square_location_type_id: 4009
additional_square_location_type_id: 4009
vice_county_location_attribute_id: 90
no_vice_county_found_message: 1km%20square
user_square_attr_id: 2
plot_number_attr_id: 118
```
