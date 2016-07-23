angular.module('admin',  ['ngTagsInput'])
    .controller('AdminController', function ($scope, $http, $location) {

         $scope.allTalents = [];
        
        $scope.talent = { name : "John", email: "a@acm", skills : [{text:'a'}]};
         

        $http.get('/api/talent')
            .success(function (data) {
                $scope.allTalents = data;
            })
            .error(function (data) {
                console.log('Error:' + data);
            });


    });


