define([
  'new-modules/Editor',
  'features/Bold',
  'features/Italic',
  'features/Image',
  'core/agent', 'core/dom', 'core/async',
  'editing/Editor',
  'settings',
  'EventHandler', 'Renderer'
], function(Editor, Bold, Italic, Image, agent, dom, async, SEditor, settings, EventHandler, Renderer) {
  // jQuery namespace for summernote
  $.summernote = $.summernote || {};

  // extends default `settings`
  $.extend($.summernote, settings);

  var renderer = new Renderer();
  var sEditor = new SEditor();

  function filesToSrcHandler(files, $editable, callback) {
    $.each(files, function(idx, file) {
      async.readFileAsDataURL(file).done(function(sDataURL) {
        sEditor.insertImage($editable, sDataURL);
      }).fail(function() {
        callback('error!');
        throw 'error -- todo..';
      });
    });
  }

  var features = [
    new Bold(),
    new Italic(),
    new Image(filesToSrcHandler)
  ];


  /**
   * extend jquery fn
   */
  $.fn.extend({
    /**
     * initialize summernote
     *  - create editor layout and attach Mouse and keyboard events.
     *
     * @param {Object} options
     * @returns {this}
     */
    summernote: function(options) {
      var $holder;
      options = $.extend({}, $.summernote.options, options);
      this.each(function(idx, elHolder) {
        $holder = $(elHolder);
        var editor = new Editor($holder, features, options);
        $holder.data('editor', editor);
      });

      // focus on first editable element
      if (this.first() && options.focus) {
        var info = renderer.layoutInfoFromHolder(this.first());
        info.editable.focus();
      }

      // callback on init
      if (this.length > 0 && options.oninit) {
        options.oninit();
      }

      return this;
    },
    /** get the current code */
    code: function() {
      var $holder = this.first();
      if ($holder.length === 0) {
        return;
      }
      var info = renderer.layoutInfoFromHolder($holder);
      if ( !! (info && info.editable)) {
        return info.editable.html();
      }
      return $holder.html();
    }
  });
});