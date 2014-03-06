define(['editing/Editor'], function (Editor) {

  function Image(filesToImgHandler) {

    var getEditable;

    var editor = new Editor();

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


    var insertImages = function ($editable, files) {
      editor.restoreRange($editable);
      filesToImgHandler(files, function complete() {
        console.log('success');
      },
      function error(err) {
        console.warn('error: ', err);
      });
    };

    var toggleBtn = function ($btn, enable) {
      if (enable) {
        $btn.removeClass('disabled').attr('disabled', false);
      } else {
        $btn.addClass('disabled').attr('disabled', true);
      }
    };

    this.onToolbarClick = function () {

      var $editable = getEditable();
      var $imageInput = this.$dialog.find('.note-image-input');
      var $imageUrl = this.$dialog.find('.note-image-url');
      var $imageBtn = this.$dialog.find('.note-image-btn');

      var $dialog = this.$dialog;
      
      $imageInput.on('change', function () {
        //fnInsertImages(this.files);
        $(this).val('');
        $dialog.modal('hide');
      });

      function fnInsertImage(url) {
        editor.restoreRange($editable);
        editor.insertImage($editable, url);
      }

      this.$dialog.one('shown.bs.modal', function (event) {
        console.log('! shown', event);
        event.stopPropagation();
        
        $imageUrl.keyup(function () {
          toggleBtn($imageBtn, $imageUrl.val());
        }).val('').focus();

        $imageBtn.click(function (event) {
          $dialog.modal('hide');
          fnInsertImage($imageUrl.val());
          event.preventDefault();
        });

      });

      this.$dialog.one('hidden.bs.modal', function (event) {
        event.stopPropagation();
        //$editable.focus();
        $imageInput.off('change');
        //$imageUrl.off('keyup');
        //$imageBtn.off('click');
      });
      this.$dialog.modal('show');
    };

    this.name = 'img';
    this.$button = undefined;

    var tag = [ '<button type="button" ',
                '  class="btn btn-default btn-sm btn-small" ',
                '  title="picture" tabindex="-1"> ',
                '  <i class="fa fa-picture-o icon-picture"></i>',
                '</button>'].join(' ');
    
    this.toolbarButton = function ($holder) {
      this.$button = $(tag);
      $holder.append(this.$button);

      this.$button.click(this.onToolbarClick.bind(this));
    };

    this.setCurrentEditable = function(cb){
      getEditable = cb;
    };
    this.editorUpdate = function (e) {

      console.log('!', e);
    };
    
    this.buildDialog = function ($holder) {
      this.$dialog = $(template).prependTo($holder);
      this.$dialog.find('button.close, a.modal-close').click(function () {
        $(this).closest('.modal').modal('hide');
      });
    };
  }

  return Image;
});
