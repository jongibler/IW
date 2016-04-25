angular.module('candidates', [])
.controller('CandidatesController', function($scope, $http, $location) {

    //on load
    $scope.pageNumber = 1;
    getPage();

    var lastPageNumber;

    //methods
    $scope.nextPage = function() {
        if ($scope.pageNumber < lastPageNumber) {
          $scope.pageNumber++;
          getPage();
        }
    };

    $scope.previousPage = function() {
        if ($scope.pageNumber > 1){
            $scope.pageNumber--;
            getPage();
        }
    };

    function getPage() {
      $http.get('/candidates/api/getPage/' + $scope.pageNumber)
          .success(function(data) {
              $scope.candidatesPage = data.page;
              lastPageNumber = data.lastPageNumber;
          })
          .error(function(data) {
              console.log('Error:' + data);
          });
    };
});
