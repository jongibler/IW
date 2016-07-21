angular.module('admin', [])
    .controller('AdminController', function ($scope, $http, $location) {

         $scope.allTalents = [{"_id":"57912d820fad1df40b1c3508","cvURL":"http://s3-eu-west-1.amazonaws.com/minimalnode/demo/1469132161937.pdf","email":"j@j.gom","name":"asdf","__v":0,"skills":["c#","javascript","html","nodejs"]}];

         

        $http.get('/api/talent')
            .success(function (data) {
                $scope.allTalents = data;
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    });
