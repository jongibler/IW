angular.module('admin', ['ngTagsInput', 'ui.bootstrap'])
    .controller('AdminController', function ($scope, $http, $location) {

        $scope.allTalents = null;
        $scope.selectedTalent = null;
        var persistTalent = null;

        $scope.selectTalent = function (talent) {
            $scope.selectedTalent = angular.copy(talent);
            persistTalent = talent;
        };

        $scope.saveTalent = function (talent) {
           	$http.post('/api/talent', talent)
                .then(function (res) { 
                    for (var k in talent) persistTalent[k] = talent[k];                    
                }, function (res) {
                    console.log('Error:' + res.data);
                });
        };

        $http.get('/api/talent')
            .success(function (data) {
                $scope.allTalents = data;
            })
            .error(function (data) {
                console.log('Error:' + data);
            });


    });


