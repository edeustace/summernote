require.config({
  baseUrl: 'src/js',
  paths: {
    jquery: '//code.jquery.com/jquery-2.1.0.min',
    lodash: '../../bower_components/lodash/dist/lodash.min',
    domReady: '../../bower_components/requirejs-domready/domReady',
    angular: '../../bower_components/angular/angular',
    bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
    CodeMirror: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror',
    CodeMirrorXml: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.min',
    CodeMirrorFormatting: '//cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.min'
  },
  shim: {
    angular: { exports: 'angular'},

    bootstrap: ['jquery'],
    CodeMirror: { exports: 'CodeMirror' },
    CodeMirrorXml: ['CodeMirror'],
    CodeMirrorFormatting: ['CodeMirror', 'CodeMirrorXml']
  }
});

define(
  [
    'require',
    'jquery',
    'angular',
    'ng-app',
    'summernote',
  ], function (require, jquery, ng) {
      'use strict';
      require(['domReady!'], function (document) {
        ng.bootstrap(document, ['summernote-spike']);
      });
    });

