define(['editing/Editor'], function(Editor) {

  function ExclamationMark() {

    var getEditable;

    var editor = new Editor();

    this.canEdit = function(nodeName) {
      return nodeName === this.name;
    };

    this.hide = function() {
      /*console.log('[Image] hide..');
      this.$handle.children().hide();
      this.$popover.find('button').unbind('click');
      this.$popover.children().hide();*/
    };

    this.editHandler = function(img, $editable) {
      /*console.log('!edit..');
      var proxy = $.proxy(this.onPopoverClick.bind(this, img), this);
      this.$popover.find('button').click(proxy);
      this.updateHandle(img);
      this.updatePopover(img);*/
    };

    this.onKeyup = function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      var rawText = $(event.target).text().replace(/(.*?)!(.*)/, '$1');
      $(event.target).find('#txt').text(rawText);
      console.log('rawText', rawText);
      $(event.target).data('em-text', rawText);
    };

    this.onKeydown = function(event) {

      if (event.keyCode === 13) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    };

    this.onToolbarClick = function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $em = $('<exclamation-mark>');
      var $n = $em.append($('<div contenteditable="false" style="border: solid 1px #4499ff;">'));
      $n.html('<div contenteditable="false"><span id="txt" contentEditable="true">hello</span><span contenteditable="false">!</span></div>');
      var node = editor.insertMarkup(getEditable(), $em[0]);
      $(node).bind('keyup', this.onKeyup);
      $(node).bind('keydown', this.onKeydown);
      //$(node).bind('click', function(e) {
      //  console.log('! click');
      //});
    };

    this.name = 'exclamation-mark';
    this.$button = undefined;

    var tag = ['<button type="button" ',
      '  class="btn btn-default btn-sm btn-small" ',
      '  title="picture" tabindex="-1"> ',
      '  <i class="fa fa-exclamation icon-exclamation"></i>',
      '</button>'
    ].join(' ');

    this.toolbarButton = function($holder) {
      this.$button = $(tag);
      $holder.append(this.$button);

      this.$button.click(this.onToolbarClick.bind(this));
    };

    this.setCurrentEditable = function(cb) {
      getEditable = cb;
    };

    this.editorUpdate = function(e) {
      //console.log('!', e);
    };

  }

  return ExclamationMark;
});