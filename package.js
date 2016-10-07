Package.describe({
  name: 'jkuester:cmmntools',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Wraps the cmmn tools from bpmn.io into a meteor package',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.use('jquery');
  //add styles
  api.addFiles( 'lib/stylesheets/app.css', [ 'client' ]);
  api.use(['templating'], 'client');
  //add templates
  api.addFiles( 'lib/templates/modeler/modeler.js', [ 'client' ] );
  //add resources
  api.addFiles( 'lib/resources/newDiagram.cmmn', ['client'], {isAsset:true} );
  api.mainModule('cmmntools.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jkuester:cmmntools');
  api.mainModule('cmmntools-tests.js');
});


Npm.depends({
    "cmmn-js"                   : "0.5.3",
    "cmmn-js-properties-panel"  : "0.2.0",
    "camunda-cmmn-moddle"       : "0.1.2",
    "matches-selector"  :   "1.0.0",
    "diagram-js"                : "0.16.0",
    "jquery"                    : "2.1.1",
    "lodash"                    : "3.0.0"
});
