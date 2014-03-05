define(['layout/editor', 'new-modules/EventHandler'], function (EditorRenderer, EventHandler) {
  function Editor($holder, features, options) {
    var renderer = new EditorRenderer(options);
    var layout = renderer.render($holder, features);
    new EventHandler(layout, features);
    return this;
  }
  return Editor;
});
