define(['layout/toolbar',
  'editing/History',
  'core/dom'
], function(toolbarLayout, History, dom) {

  function Renderer(options) {


    function initializeMarkup($container, features) {
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.processMarkup) {
          /* jshint ignore:start */
          $container.find(f.name).each(function() {
            $(this).replaceWith(f.processMarkup(this));
          });
          /* jshint ignore:end */
        }
      }
    }


    this.render = function($holder, features) {
      var next = $holder.next();
      if (next && next.hasClass('note-editor')) {
        return;
      }

      var $editor = $('<div class="note-editor"></div>');



      for (var i = 0; i < features.length; i++) {
        var f = features[i];

        if (f.buildDialog) {
          f.buildDialog($editor);
        }

        if (f.buildHandle) {
          f.buildHandle($editor);
        }

        if (f.buildPopoover) {
          f.buildPopoover($editor);
        }
      }

      if (options.width) {
        $editor.width(options.width);
      }

      var tplStatusbar = function() {
        return '<div class="note-resizebar"><div class="note-icon-bar"></div><div class="note-icon-bar"></div><div class="note-icon-bar"></div></div>';
      };


      //02. statusbar (resizebar)
      if (options.height > 0) {
        $('<div class="note-statusbar">' + tplStatusbar() + '</div>').prependTo($editor);
      }

      //03. create Editable
      var isContentEditable = !$holder.is(':disabled');
      var $editable = $('<div class="note-editable" contentEditable="' + isContentEditable + '"></div>')
        .prependTo($editor);

      if (options.height) {
        $editable.height(options.height);
      }

      if (options.direction) {
        $editable.attr('dir', options.direction);
      }

      //$editable.focus
      $editable.data('NoteHistory', new History());

      //var $preppedHtml = prepareHtml($holder, features);
      $editable.html($holder.html() || '<div></div>');

      initializeMarkup($editable, features);

      toolbarLayout.render($editor, features);
      $editor.insertAfter($holder);
      $holder.hide();
      return new Layout($editor);
    };
  }

  function Layout($holder) {
    this.$editable = function() {
      return $holder.find('.note-editable');
    };
  }

  return Renderer;
});