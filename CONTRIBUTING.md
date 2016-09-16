_# Issues


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

## Environment

For the app to work correctly you will need to specify some backend variables.
 The build process loads environment variables from a .env file.
The required ones are: REGISTER_URL, REPORT_URL, RECORD_URL, APP_SECRET (iform mobile auth login)

## Style Guide

The code is *[eslint](http://eslint.org)*'ed, to detect issues early on, so it is 
important to lint your code before commiting the changes to the repository.
To do that you can run eslint command line tool or choose one of the numerous 
eslint plugins for your IDE.

Project uses [AirBnB Style Guide](https://github.com/airbnb/javascript).


# Architecture

The app is designed around [Backbone](backbone.org) framework that helps to 
structure the code
into a MV* like pattern. Backbone is very open on how you build your app and is also
missing some useful *View* functionality that other frameworks like Angular or Ember
provide, so we use Backbone plugin [Marionette](marionettejs.org) to extend and 
improve the Backbone Views. Since Backbone doesn't provide a controller - 
the logic is shared between Views (making them somewhat presenter like), 
we have introduced simple controllers which hold the internal app logic. 
The app is structured in such a way:  

```
├── images
├── scripts
│   ├── components
│   │   ├── common
│   │   │   ├── pages
│   │   │   └── templates
│   │   └── **component**
│   │       └── **sub component**
│   │           └── templates
│   ├── data
│   └── helpers
├── styles
│   ├── common
│   └── **component**
└── vendor
```

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


## Helpers folder

* App helper libraries
* Independent from Marionette, otherwise should be in *common*
* Too small to be put into vendor


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

- To run the tests locally:

```bash
grunt test
```

# Cordova

## iOS 

Use XCode to build and upload

## Android

Run and upload binaries from cordova/dist
```bash
grunt cordova:android
grunt cordova:android:old
```
_