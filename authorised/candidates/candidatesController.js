angular.module('candidates', [])
.controller('CandidatesController', function($scope, $http, $location) {

    $http.get('/candidates/api')
        .success(function(data) {
            $scope.candidatesPage = data;
        })
        .error(function(data) {
            console.log('Error:' + data);
    });


});
