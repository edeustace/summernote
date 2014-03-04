require(['angular', 'directives/declaration'], function (angular) {

  angular.module('summernote-spike.directives').directive('multipleChoice', ['$compile', '$log', function () {

    function link($scope) {

      console.log("!! multiple-choice");
      $scope.componentBridge = {
        setData: function (d) {
          $scope.model = d;
        }
      };

      $scope.add = function () {
        $scope.model.choices = $scope.model.choices || [];
        $scope.model.choices.push({label: "choice", value: "1"});
      };
      $scope.$emit("registerComponent", $scope.id, $scope.componentBridge);
    }

    return {
      link: link,
      restrict: 'E',
      scope: {
        id: '@'
      },
      template: [
        "<div contenteditable='false'>",
        "  <div>Prompt: <div class='edit-box' editable-content ng-model='model.prompt'>...</div>",
        "  <div ng-repeat='c in model.choices' >",
        "    <input tabindex='-1' type='radio' value='{{c.value}}'></input>",
        "    <span editable-content ng-model='c.label'></span>",
        "  </div>",
        "  <button ng-click='add()'>Add</button>",
        "</div>"
      ].join("\n"),
      replace: false
    };
  }]);

});


