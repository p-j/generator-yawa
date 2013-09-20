# Yet Another Web App Generator

Yeoman generator that scaffolds out a front-end web app, based on the official [webapp generator](https://github.com/yeoman/generator-webapp).

## Features
* [Assemble](https://github.com/assemble/assemble)
* CSS Autoprefixing (new)
* Built-in preview server with LiveReload
* Automagically compile CoffeeScript & Compass
* Automagically lint your scripts
* Automagically wire up your Bower components. Supported both [with](https://github.com/yeoman/grunt-bower-requirejs) and [without](https://github.com/stephenplusplus/grunt-bower-install) (new) RequireJS.
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Mocha Unit Testing with PhantomJS
* Optional - RequireJS
* Optional - Twitter Bootstrap for SASS
* Optional - Leaner Modernizr builds
* Optional - [GroundworkCSS](https://github.com/groundworkcss/groundwork) : a fully responsive HTML5, CSS and Javascript toolkit created by [@ghepting](https://twitter.com/ghepting).

For more information on what `generator-yawa` can do for you, take a look at the [Grunt tasks](https://github.com/p-j/generator-yawa/blob/master/app/templates/_package.json) used in our `package.json`.

## Getting Started

- Install: `npm install -g generator-yawa`
- Run: `yo yawa`
- Run `grunt build` for building and `grunt server` for preview

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework <framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.

## TODO
* Investigate other template engine integration (Dust.js, Underscore, Jade...) using Assemble (or not).

## Contribute

If you find a bug or woud like to see a new feature added, please fill an issue here on github or even better, send a pull request.

## Author

YAWA Generator is brought to you by [Jeremie Parker](http://jeremie-parker.com) and made possible by the awsome work of all the opensource community around
Yeoman, Grunt, Bootstrap, Groundwork etc...


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
