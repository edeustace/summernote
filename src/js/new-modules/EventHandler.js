define([], function() {
  function EventHandler(editor, features) {

    var $editable;

    var currentFeature;

    function findFeatureEditor(nodeName) {

      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.canEdit && f.canEdit(nodeName)) {
          return f;
        }
      }
    }

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

      var nodeName = e.target.nodeName;

      var newFeature = findFeatureEditor(nodeName.toLowerCase());
      if (currentFeature && currentFeature !== newFeature) {
        currentFeature.hide();
      }

      currentFeature = newFeature;

      if (currentFeature) {
        currentFeature.editHandler(e.target, $editable);
      } else {
        console.log(document.getSelection().rangeCount);
        for (var i = 0; i < features.length; i++) {
          var f = features[i];
          if (f.editorUpdate) {
            f.editorUpdate(e);
          }
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