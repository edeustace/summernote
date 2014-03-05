define([], function () {
  function EventHandler(editor, features) {

    function onKeyup(e) {
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.editorUpdate) {
          f.editorUpdate(e);
        }
      }
    }

    function onMouseup(e) {
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.editorUpdate) {
          f.editorUpdate(e);
        }
      }
    }

    editor.$editable().on('keyup', onKeyup);
    editor.$editable().on('mouseup', onMouseup);
  }
  return EventHandler;
});
