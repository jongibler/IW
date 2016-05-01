angular.module('candidates', [])
.controller('CandidatesController', function($scope, $http, $location) {
    var lastPageNumber;
    $scope.pageNumber = 1;
    getPage();

    $scope.getNextPage = function() {
        if ($scope.pageNumber < lastPageNumber) {
          $scope.pageNumber++;
          getPage();
        }
    };

    $scope.getPreviousPage = function() {
        if ($scope.pageNumber > 1){
            $scope.pageNumber--;
            getPage();
        }
    };

    $scope.setCurrentCandidate = function(candidate, index) {
      $scope.currentCandidate = candidate;
      $scope.currentCandidateIndex = index;
    };

    $scope.nextCandidate = function() {
      if ($scope.currentCandidateIndex == $scope.candidatesPage.length-1){
        $scope.getNextPage();
        $scope.currentCandidateIndex = 0;
        $scope.currentCandidate = $scope.candidatesPage[$scope.currentCandidateIndex];
      }
      else {
          $scope.currentCandidateIndex++;
          $scope.currentCandidate = $scope.candidatesPage[$scope.currentCandidateIndex];
      }
    };

    $scope.previousCandidate = function() {
      if ($scope.currentCandidateIndex == 0) {
        $scope.getPreviousPage();
        $scope.currentCandidateIndex = $scope.candidatesPage.length-1;
        $scope.currentCandidate = $scope.candidatesPage[$scope.currentCandidateIndex];
      }
      else {
        $scope.currentCandidateIndex--;
        $scope.currentCandidate = $scope.candidatesPage[$scope.currentCandidateIndex];
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
