define([], function () {
  
  function TextFeature() {}
  

  TextFeature.prototype.onClick = function () {
    document.execCommand(this.name, false);
  };

  TextFeature.prototype.name = 'abstract';
  TextFeature.prototype.$button = undefined;

  TextFeature.prototype.toolbarButton = function ($holder) {
    this.$button = $('<button type="button" class="btn btn-default btn-sm btn-small" title="' + this.name + '" data-shortcut="Ctrl+B" data-mac-shortcut="⌘+B" data-event="bolds" tabindex="-1"><i class="fa fa-' + this.name + ' icon-bold"></i></button>');
    $holder.append(this.$button);
    this.$button.click(this.onClick.bind(this));
  };

  TextFeature.prototype.editorUpdate = function () {
    var isActive = document.queryCommandState(this.name);
    if (isActive) {
      this.$button.addClass('active');
    } else {
      this.$button.removeClass('active');
    }
  };

  return TextFeature;
});
