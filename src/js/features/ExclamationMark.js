define(['editing/Editor'], function(Editor) {

  function ExclamationMark() {

    this.name = 'exclamation-mark';

    this.$button = undefined;

    var getEditable;

    var editor = new Editor();

    this.canEdit = function(nodeName) {
      return nodeName === this.name;
    };

    this.processMarkup = function(node) {
      return this.addNode($(node).text());
    };

    this.customiseMarkup = function(node) {
      return '<exclamation-mark>' + $(node).data('em-text') + '</exclamation-mark>';
    };

    this.onKeyup = function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      var rawText = $(event.target).text().replace(/(.*?)!(.*)/, '$1');
      $(event.target).find('#txt').text(rawText);
      console.log('rawText', rawText);
      $(event.currentTarget).data('em-text', rawText);
    };

    this.onKeydown = function(event) {

      if (event.keyCode === 13) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    };

    this.template = function(text) {
      return [
        '<div contenteditable="false">',
        '  <div contenteditable="false" style="border: solid 1px #4499ff;">',
        '    <span id="txt" contentEditable="true">' + text + '</span><span contenteditable="false">!</span>',
        '  </div>',
        '</div>'
      ].join('\n');
    };

    this.addNode = function(text) {
      var $em = $('<exclamation-mark>');
      $em.data('em-text', text);
      //Note: keyup and key down need to be wrapped in a non editable div
      var $n = $em.append($('<div contenteditable="false" style="border: solid 1px #4499ff;">'));
      $n.html('<div contenteditable="false"><span id="txt" contentEditable="true">' + text + '</span><span contenteditable="false">!</span></div>');
      $em.bind('keyup', this.onKeyup);
      $em.bind('keydown', this.onKeydown);
      return $em;
    };

    this.onToolbarClick = function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $newNode = this.addNode('hello - i\'m an exclamation mark');
      var node = editor.insertMarkup(getEditable(), $newNode[0]);
      $(node).bind('keyup', this.onKeyup);
      $(node).bind('keydown', this.onKeydown);
    };


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