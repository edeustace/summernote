require.config({
  baseUrl: 'src/js',
  paths: {
    jquery: '//code.jquery.com/jquery-1.9.1.min',
    bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
    CodeMirror: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror',
    CodeMirrorXml: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.min',
    CodeMirrorFormatting: '//cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.min'
  },
  shim: {
    bootstrap: ['jquery'],
    CodeMirror: { exports: 'CodeMirror' },
    CodeMirrorXml: ['CodeMirror'],
    CodeMirrorFormatting: ['CodeMirror', 'CodeMirrorXml']
  }
});

require([
  'jquery', 'bootstrap', 'CodeMirrorFormatting',
  'summernote'
], function ($) {
  // summernote
  $('.summernote').summernote({
    height: 300,                  // set editable area's height
    focus: true,                  // set focus editable area after summernote loaded
    tabsize: 2,                   // size of tab
    // disableDragAndDrop: false, // disable drag and drop event
    codemirror: {                 // code mirror options
      theme: 'monokai'
    },
    buttons: [
      {
        onClick: function (editor, $editable, range) {
          
          editor.recordUndo($editable);
          editor.restoreRange($editable);
          var url = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQsUU2rnO7aifTmF-TsnYfEN7HsAXLgYu_iUjzBS6aj1WFh6oPF';
          var $node = $('<img>').attr('src', url);
          range.create().insertNode($node[0]);
        },
        uid: 'add-kenny-powers',
        toolbarButton: function () {
          return [
            '<button type="button" ',
            '  class="btn btn-default btn-sm btn-small" ',
            '  title="test" data-event="' + this.uid + '" ',
            '  tabindex="-1">',
            '  <i class="fa fa-trophy"></i>',
            '</button>'
          ].join('\n');
        }
      }
    ]
  });
});
