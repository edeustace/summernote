define([], function () {
  function ToolbarLayout() {
    this.render = function ($container, features) {
      var toolbar = '<div class="note-toolbar btn-toolbar"></div>';
      var $toolbar = $(toolbar).prependTo($container);

      for (var i = 0 ; i < features.length ; i++) {
        var f = features[i];
        if (f.toolbarButton) {
          f.toolbarButton($toolbar);
        }
      }
      return $toolbar;
    };
  }
  return new ToolbarLayout();
});
