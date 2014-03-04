require([
  'require', 'jquery', 'angular', 'bootstrap', 'CodeMirrorFormatting',
  'summernote', 'controllers/declaration', 'controllers/main', 'angularSummernote'
], function (require, $, angular) {
    return angular.module('summernote-spike', [ 'summernote-spike.controllers', 'summernote']);

  // summernote
  /*$('.summernote').summernote({
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
  });*/
  });
