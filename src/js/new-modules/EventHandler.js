define([], function () {
  function EventHandler(editor, features) {

    var $editable;

    function onKeyup(e) {

      $editable = $(e.currentTarget).closest('.note-editable');

      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.editorUpdate) {
          f.editorUpdate(e);
        }
      }
    }

    function onMouseup(e) {
      $editable = $(e.currentTarget).closest('.note-editable');

      console.log(document.getSelection().rangeCount);
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.editorUpdate) {
          f.editorUpdate(e);
        }
      }
    }

    function getEditable() {
      return $editable;
    }

    $editable = editor.$editable();
    $editable.on('keyup', onKeyup);
    $editable.on('mouseup', onMouseup);


    for (var i = 0; i < features.length; i++) {
      var f = features[i];
      if (f.setCurrentEditable) {
        f.setCurrentEditable(getEditable);
      }
    }
  }
  return EventHandler;
});
