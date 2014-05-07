'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var MobileGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();
    this.log(this.yeoman);
    this.log(chalk.magenta('You\'re using the fantastic mobileApp generator.'));

    var prompts = [{
      name: 'webappName',
      message: 'Give your fantastic, sweet and awesome app a name: '
    },
    {
      type: 'checkbox',
      name: 'bowerPackages',
      message: 'Choose the libraries you need: ',
      choices: [
        {
          name: 'jQuery',
          value: 'includeJQuery',
          checked: true
        },
        /*{
          name: 'jQuery-Mobile',
          value: 'includeJQuery-Mobile',
          checked: false
        },*/ {
          name: 'Angular JS',
          value: 'includeAngular',
          checked: false
        }, {
          name: 'Parallax',
          value: 'includeParallax',
          checked: false
        }, {
          name: 'Bootstrap',
          value: 'includeBootstrap',
          checked: false
        }
      ]
    }];

    this.prompt(prompts, function (features) {
      function includedBowerFeature(f) {
        return bower.indexOf(f) !== -1;
      }

      var bower = features.bowerPackages;
      this.webappName = features.webappName;

      this.bootstrap = includedBowerFeature("includeBootstrap");
      this.jQuery = includedBowerFeature("includeJQuery");
      //this.jQueryMobile = includedBowerFeature("includeJQuery-Mobile");
      this.angular = includedBowerFeature("includeAngular");
      this.parallax = includedBowerFeature("includeParallax");

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/images');
    this.mkdir('app/css');
    this.mkdir('app/scripts');
    this.mkdir('libs');

    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'index.html');
    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    this.template('base.scss', 'app/css/base.scss');
    this.template('app.js', 'app/scripts/app.js');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  runtime: function() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = MobileGenerator;