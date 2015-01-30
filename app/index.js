'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var YawaGenerator = module.exports = function YawaGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	// setup the test-framework property, Gruntfile template will need this
	this.testFramework = options['test-framework'] || 'mocha';

	// for hooks to resolve on mocha by default
	if (!options['test-framework']) {
		options['test-framework'] = 'mocha';
	}

	// resolved to mocha by default (could be switched to jasmine for instance)
	this.hookFor('test-framework', {
		as: 'app'
	});

	this.mainCoffeeFile = 'console.log "\'Allo from CoffeeScript!"';

	this.on('end', function() {
		this.installDependencies({
			skipInstall: options['skip-install'],
			skipMessage: options['skip-install-message']
		});
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(YawaGenerator, yeoman.generators.Base);

YawaGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// welcome message
	if (!this.options['skip-welcome-message']) {
		console.log(this.yeoman);
		console.log('Out of the box I include HTML5 Boilerplate and jQuery.');
	}

	var prompts = [{
		type: 'list',
		name: 'uiframework',
		message: 'Would you use one of these fine UI Framework ?',
		choices: [{
			name: 'GroundworkCSS',
			value: 'groundwork'
		}, {
			name: 'Bootstrap for Sass',
			value: 'bootstrap'
		}, {
			name: 'None',
			value: false
		}]
	}, {
		type: 'checkbox',
		name: 'features',
		message: 'What more would you like?',
		choices: [{
			name: 'RequireJS',
			value: 'includeRequireJS',
			checked: true
		}, {
			name: 'Modernizr',
			value: 'includeModernizr',
			checked: true
		}, {
			name: 'Assemble',
			value: 'includeAssemble',
			checked: true
		}]
	}];

	this.prompt(prompts, function(answers) {
		var features = answers.features;
		var uiframework = answers.uiframework;

		function hasFeature(feat) {
			return features.indexOf(feat) !== -1;
		}

		// manually deal with the response, get back and store the results.
		// we change a bit this way of doing to automatically do this in the self.prompt() method.
		this.compassBootstrap = (uiframework === 'bootstrap');
		this.groundworkCSS = (uiframework === 'groundwork');
		this.includeRequireJS = hasFeature('includeRequireJS');
		this.includeModernizr = hasFeature('includeModernizr');
		this.includeAssemble = hasFeature('includeAssemble');

		cb();
	}.bind(this));
};

YawaGenerator.prototype.gruntfile = function gruntfile() {
	this.template('Gruntfile.js');
};

YawaGenerator.prototype.packageJSON = function packageJSON() {
	this.template('_package.json', 'package.json');
};

YawaGenerator.prototype.git = function git() {
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
};

YawaGenerator.prototype.bower = function bower() {
	this.copy('bowerrc', '.bowerrc');
	this.copy('_bower.json', 'bower.json');
};

YawaGenerator.prototype.jshint = function jshint() {
	this.copy('jshintrc', '.jshintrc');
};

YawaGenerator.prototype.editorConfig = function editorConfig() {
	this.copy('editorconfig', '.editorconfig');
};

YawaGenerator.prototype.h5bp = function h5bp() {
	this.copy('favicon.ico', 'app/favicon.ico');
	if (this.includeAssemble) {
		this.copy('404.hbs', 'app/templates/pages/404.hbs');
		// this.copy('layout.hbs', 'app/templates/layouts/default.hbs');
		// this.copy('index.hbs', 'app/templates/pages/index.hbs');
	} else {
		this.copy('404.html', 'app/404.html');
	}
	this.copy('robots.txt', 'app/robots.txt');
	this.copy('htaccess', 'app/.htaccess');
};

YawaGenerator.prototype.mainStylesheet = function mainStylesheet() {
	if (this.compassBootstrap) {
		this.copy('bootstrap.scss', 'app/styles/main.scss');
	} else if (this.groundworkCSS) {
		this.copy('groundwork.scss', 'app/styles/main.scss');
		this.copy('groundwork_settings.scss', 'app/styles/_settings.scss');
		this.copy('groundwork_app.scss', 'app/styles/_app.scss');
	} else {
		this.copy('main.css', 'app/styles/main.css');
	}
};

YawaGenerator.prototype.writeIndex = function writeIndex() {
	if (this.includeAssemble) {
		this.layoutFile = this.readFileAsString(path.join(this.sourceRoot(), 'layout.hbs'));
		this.layoutFile = this.engine(this.layoutFile, this);

		this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.hbs'));
		this.indexFile = this.engine(this.indexFile, this);

		if (!this.includeRequireJS) {
			this.layoutFile = this.appendScripts(this.layoutFile, 'scripts/main.js', [
				'scripts/main.js'
			]);

			this.layoutFile = this.appendFiles({
				html: this.layoutFile,
				fileType: 'js',
				optimizedPath: 'scripts/coffee.js',
				sourceFileList: ['scripts/hello.js'],
				searchPath: '.tmp'
			});
		}

		if (!this.includeRequireJS) {
			if (this.compassBootstrap) {
				// wire Twitter Bootstrap plugins
				this.layoutFile = this.appendScripts(this.layoutFile, 'scripts/plugins.js', [
					'bower_components/sass-bootstrap/js/affix.js',
					'bower_components/sass-bootstrap/js/alert.js',
					'bower_components/sass-bootstrap/js/dropdown.js',
					'bower_components/sass-bootstrap/js/tooltip.js',
					'bower_components/sass-bootstrap/js/modal.js',
					'bower_components/sass-bootstrap/js/transition.js',
					'bower_components/sass-bootstrap/js/button.js',
					'bower_components/sass-bootstrap/js/popover.js',
					'bower_components/sass-bootstrap/js/carousel.js',
					'bower_components/sass-bootstrap/js/scrollspy.js',
					'bower_components/sass-bootstrap/js/collapse.js',
					'bower_components/sass-bootstrap/js/tab.js'
				]);
			} else if (this.groundworkCSS) {
				// wire Groundwork plugins
				this.layoutFile = this.appendScripts(this.layoutFile, 'scripts/plugins.js', [
					'bower_components/groundwork/js/plugins/jquery-placeholderText.js',
					'bower_components/groundwork/js/plugins/jquery-responsiveTables.js',
					'bower_components/groundwork/js/plugins/jquery-responsiveText.js',
					'bower_components/groundwork/js/plugins/jquery-truncateLines.js',
					'bower_components/groundwork/js/components/dismissible.js',
					'bower_components/groundwork/js/components/equalizeColumns.js',
					'bower_components/groundwork/js/components/forms.js',
					'bower_components/groundwork/js/components/menus.js',
					'bower_components/groundwork/js/components/tabs.js',
					'bower_components/groundwork/js/components/checklists.js',
					'bower_components/groundwork/js/components/navigation.js'
				]);
			}
		}
	} else {
		this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
		this.indexFile = this.engine(this.indexFile, this);

		if (!this.includeRequireJS) {
			this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
				'scripts/main.js'
			]);

			this.indexFile = this.appendFiles({
				html: this.indexFile,
				fileType: 'js',
				optimizedPath: 'scripts/coffee.js',
				sourceFileList: ['scripts/hello.js'],
				searchPath: '.tmp'
			});
		}

		if (!this.includeRequireJS) {
			if (this.compassBootstrap) {
				// wire Twitter Bootstrap plugins
				this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
					'bower_components/sass-bootstrap/js/affix.js',
					'bower_components/sass-bootstrap/js/alert.js',
					'bower_components/sass-bootstrap/js/dropdown.js',
					'bower_components/sass-bootstrap/js/tooltip.js',
					'bower_components/sass-bootstrap/js/modal.js',
					'bower_components/sass-bootstrap/js/transition.js',
					'bower_components/sass-bootstrap/js/button.js',
					'bower_components/sass-bootstrap/js/popover.js',
					'bower_components/sass-bootstrap/js/carousel.js',
					'bower_components/sass-bootstrap/js/scrollspy.js',
					'bower_components/sass-bootstrap/js/collapse.js',
					'bower_components/sass-bootstrap/js/tab.js'
				]);
			} else if (this.groundworkCSS) {
				// wire Groundwork plugins
				this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
					'bower_components/groundwork/js/plugins/jquery-responsiveTables.js',
					'bower_components/groundwork/js/plugins/jquery-responsiveText.js',
					'bower_components/groundwork/js/plugins/jquery-tooltip.js',
					'bower_components/groundwork/js/plugins/jquery-truncateLines.js',
					'bower_components/groundwork/js/components/disabled.js',
					'bower_components/groundwork/js/components/dismissible.js',
					'bower_components/groundwork/js/components/equalizeColumns.js',
					'bower_components/groundwork/js/components/forms.js',
					'bower_components/groundwork/js/components/menus.js',
					'bower_components/groundwork/js/components/modals.js',
					'bower_components/groundwork/js/components/pagination.js',
					'bower_components/groundwork/js/components/tabs.js',
					'bower_components/groundwork/js/components/tiles.js',
					'bower_components/groundwork/js/components/tooltips.js'
				]);
			}
		}
	}


};

// TODO(mklabs): to be put in a subgenerator like rjs:app
YawaGenerator.prototype.requirejs = function requirejs() {
	if (!this.includeRequireJS) {
		return;
	}

	this.layoutFile = this.appendScripts(this.layoutFile, 'scripts/main.js', ['bower_components/requirejs/require.js'], {
		'data-main': 'scripts/main'
	});

	// add a basic amd module
	this.write('app/scripts/app.js', [
		'/*global define */',
		'define([], function () {',
		'    \'use strict\';\n',
		'    return \'\\\'Allo \\\'Allo!\';',
		'});'
	].join('\n'));

	this.template('require_main.js', 'app/scripts/main.js');
};

YawaGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/scripts');
	this.mkdir('app/styles');
	this.mkdir('app/images');
	this.mkdir('app/fonts');
	if (this.includeAssemble) {
		this.mkdir('app/templates');
		this.mkdir('app/templates/pages');
		this.mkdir('app/templates/layouts');
		this.mkdir('app/templates/partials');
		this.write('app/templates/layouts/default.hbs', this.layoutFile);
		this.write('app/templates/pages/index.hbs', this.indexFile);
	} else {
		this.write('app/index.html', this.indexFile);
	}
	this.write('app/scripts/hello.coffee', this.mainCoffeeFile);
	if (!this.includeRequireJS) {
		this.write('app/scripts/main.js', 'console.log(\'\\\'Allo \\\'Allo!\');');
	}
};
