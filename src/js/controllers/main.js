
require(['angular', 'lodash', 'controllers/declaration'], function (angular, _) {
    angular.module('summernote-spike.controllers').controller('Main', [ '$scope', '$compile', function ($scope, $compile) {
        console.log('! main');



        var bridges = {};

        $scope.getUid = function () {
          if (!$scope.compModel) {
            throw "No comp data holder";
          }
          var uid = _.size($scope.compModel);
          $scope.compModel[uid] = {};
          return uid;
        };


        $scope.$on("registerComponent", function (event, id, bridge) {
          bridges[id] = bridge;
          if ($scope.compModel[id]) {
            bridge.setData($scope.compModel[id]);
          }
        });

        $scope.components = [
          {
            tag: "mc",
            name: "multiple-choice",
            createTag: function () {
              return "<mc id='" + $scope.getUid() + "'></mc>";
            },
            toHtml: function (node) {

              var id = $(node).attr("id");
              return "<mc id='" + id + "'></mc>";
            }
          }
        ];

        $scope.compModel = {};

        $scope.dataJson = "?";
        $scope.$watch('compModel', function (n) {

          //$log.debug(">> data: ", n);
          var out = JSON.stringify(n, null, 2);
          //$log.debug(out);
          $scope.dataJson = out;
        }, true);

        $scope.xhtml = "<p> hello  </p>";
        $scope.$watch("xhtml", function () {
          //console.log("n: ", n);
        });


        $scope.toolbarAddons = [
          {
            onClick: function (editor, $editable, range) {
              editor.recordUndo($editable);
              editor.restoreRange($editable);
              //var url = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQsUU2rnO7aifTmF-TsnYfEN7HsAXLgYu_iUjzBS6aj1WFh6oPF';
              var $node = $('<multiple-choice id="' + $scope.getUid() + '">');//.attr('src', url);
              range.create().insertNode($node[0]);
              $compile($node)($scope.$new());
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
