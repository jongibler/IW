angular.module('admin', ['ngTagsInput', 'ui.bootstrap'])
    .controller('AdminController', function ($scope, $http, $location) {

        $scope.allTalents = null;
        $scope.selectedTalent = null;

        var talentBackup = null;

        $scope.setTalent = function (talent) {
           $scope.selectedTalent =  angular.copy(talent);
        };

        $http.get('/api/talent')
            .success(function (data) {
                $scope.allTalents = data;
            })
            .error(function (data) {
                console.log('Error:' + data);
            });


    });


