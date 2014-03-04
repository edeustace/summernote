require(['angular', 'controllers/declaration'], function (angular) {
    angular.module('summernote-spike.controllers').controller('Main', [ '$scope', function ($scope) {
        console.log('! main');


        $scope.toolbarAddons = [
          {
            onClick: function (editor, $editable, range) {
              editor.recordUndo($editable);
              editor.restoreRange($editable);
              var url = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQsUU2rnO7aifTmF-TsnYfEN7HsAXLgYu_iUjzBS6aj1WFh6oPF';
              var $node = $('<img>').attr('src', url);
              range.create().insertNode($node[0]);
            },
            uid: 'add-kenny-powers',
            toolbarButton: function () {
              return [
                '<button type="button" ',
                '  class="btn btn-default btn-sm btn-small" ',
                '  title="test" data-event="' + this.uid + '" ',
                '  tabindex="-1">',
                '  <i class="fa fa-trophy"></i>',
                '</button>'
              ].join('\n');
            }
          }
        ];
      }]);
  });
