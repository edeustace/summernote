define(['editing/Editor'], function(Editor) {

  function Image(filesToImgHandler) {

    var getEditable;

    var editor = new Editor();

    var popoverTemplate = '<div id="img-popover" class="note-popover">' +
      '  <div class="note-image-popover popover bottom in" style="display: none;">' +
      '  <div class="arrow"></div>' +
      '  <div class="popover-content note-image-content">' +
      '    <div class="btn-group">' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.resizeFull" data-event="resize" data-value="1" tabindex="-1"><span class="note-fontsize-10">100%</span> </button>' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.resizeHalf" data-event="resize" data-value="0.5" tabindex="-1"><span class="note-fontsize-10">50%</span> </button>' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.resizeQuarter" data-event="resize" data-value="0.25" tabindex="-1"><span class="note-fontsize-10">25%</span> </button>' +
      '    </div>' +
      '    <div class="btn-group">' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.floatLeft" data-event="floatMe" data-value="left" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button>' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.floatRight" data-event="floatMe" data-value="right" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button>' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.floatNone" data-event="floatMe" data-value="none" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button>' +
      '    </div>' +
      '    <div class="btn-group">' +
      '      <button type="button" class="btn btn-default btn-sm btn-small" title="lang.image.remove" data-event="removeMedia" data-value="none" tabindex="-1"><i class="fa fa-trash-o icon-trash"></i></button>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '</div>';


    var template = '<div class="note-image-dialog modal" aria-hidden="false">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>' +
      '<h4>' + 'insert image' + '</h4>' +
      '</div>' +
      '<div class="modal-body">' +
      '<div class="row-fluid">' +
      '<h5>' + 'select from files' + '</h5>' +
      '<input class="note-image-input" type="file" name="files" accept="image/*" />' +
      '<h5>' + 'url' + '</h5>' +
      '<input class="note-image-url form-control span12" type="text" />' +
      '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button href="#" class="btn btn-primary note-image-btn disabled" disabled="disabled">' + 'insert' + '</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';



    var handleTemplate = '<div id="img-handle" class="note-handle">' +
      '<div class="note-control-selection">' +
      '<div class="note-control-selection-bg"></div>' +
      '<div class="note-control-holder note-control-nw"></div>' +
      '<div class="note-control-holder note-control-ne"></div>' +
      '<div class="note-control-holder note-control-sw"></div>' +
      '<div class="note-control-sizing note-control-se"></div>' +
      '<div class="note-control-selection-info"></div>' +
      '</div>' +
      '</div>';


    /*var insertImages = function ($editable, files) {
      editor.restoreRange($editable);
      filesToImgHandler(files, function complete() {
        console.log('success');
      },
      function error(err) {
        console.warn('error: ', err);
      });
    };*/

    var toggleBtn = function($btn, enable) {
      if (enable) {
        $btn.removeClass('disabled').attr('disabled', false);
      } else {
        $btn.addClass('disabled').attr('disabled', true);
      }
    };

    this.canEdit = function(nodeName) {
      return nodeName === 'img';
    };

    this.hide = function() {
      console.log('[Image] hide..');
      this.$handle.children().hide();
      this.$popover.find('button').unbind('click');
      this.$popover.children().hide();
    };

    this.editHandler = function(img, $editable) {
      console.log('!edit..');
      var proxy = $.proxy(this.onPopoverClick.bind(this, img), this);
      this.$popover.find('button').click(proxy);
      this.updateHandle(img);
      this.updatePopover(img);
    };

    this.updatePopover = function(img) {
      var $imagePopover = this.$popover.find('.note-image-popover');
      var $placeholder = $(img);
      var pos = $placeholder.position(),
        height = $placeholder.height();

      // display popover below placeholder.
      $imagePopover.children().show();
      $imagePopover.css({
        display: 'block',
        left: pos.left,
        top: pos.top + height
      });
    };

    this.updateHandle = function(img) {
      var $selection = this.$handle.find('.note-control-selection');
      var $image = $(img);
      var pos = $image.position();
      var szImage = {
        w: $image.width(),
        h: $image.height()
      };
      $selection.css({
        display: 'block',
        left: pos.left,
        top: pos.top,
        width: szImage.w,
        height: szImage.h
      }).data('target', img); // save current image element.
      var sSizing = szImage.w + 'x' + szImage.h;
      $selection.find('.note-control-selection-info').text(sSizing);
    };


    this.onToolbarClick = function(event) {
      event.preventDefault();
      event.stopPropagation();

      var $imageInput = this.$dialog.find('.note-image-input');
      var $imageUrl = this.$dialog.find('.note-image-url');
      var $imageBtn = this.$dialog.find('.note-image-btn');

      var $dialog = this.$dialog;

      $imageInput.on('change', function() {
        //fnInsertImages(this.files);
        $(this).val('');
        $dialog.modal('hide');
      });

      function fnInsertImage(url) {
        editor.restoreRange(getEditable());
        console.log('[Image] insertImage: ', url);
        editor.insertImage(getEditable(), url);
      }

      this.$dialog.one('shown.bs.modal', function(event) {
        console.log('! shown', event);
        event.stopPropagation();

        $imageUrl.keyup(function() {
          toggleBtn($imageBtn, $imageUrl.val());
        }).val('').focus();

        $imageBtn.click(function(event) {
          $dialog.modal('hide');
          fnInsertImage($imageUrl.val());
          event.preventDefault();
        });

      });

      this.$dialog.one('hidden.bs.modal', function(event) {
        event.stopPropagation();
        getEditable().focus();
        $imageInput.off('change');
        $imageUrl.off('keyup');
        $imageBtn.off('click');
      });
      this.$dialog.modal('show');
    };

    this.name = 'img';
    this.$button = undefined;

    var tag = ['<button type="button" ',
      '  class="btn btn-default btn-sm btn-small" ',
      '  title="picture" tabindex="-1"> ',
      '  <i class="fa fa-picture-o icon-picture"></i>',
      '</button>'
    ].join(' ');


    this.resize = function($editable, sValue, $target) {
      //recordUndo($editable);

      $target.css({
        width: $editable.width() * sValue + 'px',
        height: ''
      });

      this.updateHandle($target[0]);
      this.updatePopover($target[0]);
    };

    this.toolbarButton = function($holder) {
      this.$button = $(tag);
      $holder.append(this.$button);

      this.$button.click(this.onToolbarClick.bind(this));
    };

    this.setCurrentEditable = function(cb) {
      getEditable = cb;
    };

    this.editorUpdate = function(e) {
      console.log('!', e);
    };

    this.onPopoverClick = function(img, event) {
      console.log('popover button click: ', img, event, this);

      var $b = $(event.currentTarget);

      var action = $b.attr('data-event');
      var val = $b.attr('data-value');

      if (action === 'resize') {
        this.resize(getEditable(), val, $(img));
      }
    };

    this.buildPopoover = function($holder) {
      this.$popover = $(popoverTemplate).prependTo($holder);

    };

    this.buildHandle = function($holder) {
      this.$handle = $(handleTemplate).prependTo($holder);
    };


    this.buildDialog = function($holder) {
      this.$dialog = $(template).prependTo($holder);
      this.$dialog.find('button.close, a.modal-close').click(function() {
        $(this).closest('.modal').modal('hide');
      });
    };
  }

  return Image;
});