/*global describe, beforeEach, it*/

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


describe('Yawa generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.yawa = helpers.createGenerator('yawa:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files in non-AMD mode', function (done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/scripts/hello.coffee',
      'app/scripts/main.js',
      'app/styles/main.scss'
    ];

    helpers.mockPrompt(this.yawa, {
      features: ['compassBootstrap', 'includeRequireJS']
    });

    this.yawa.options['skip-install'] = true;
    this.yawa.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files in AMD mode', function (done) {
    var expected= [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      ['app/scripts/main.js', /require\.config/],
      'app/styles/main.scss'
    ];

    helpers.mockPrompt(this.yawa, {
      features: ['compassBootstrap', 'includeRequireJS']
    });

    this.yawa.options['skip-install'] = true;
    this.yawa.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
