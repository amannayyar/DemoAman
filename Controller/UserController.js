/// <reference path="../Scripts/angular.min.js" />
Gamingapp.controller("UserController", ['$scope', "$rootScope", "$location", "$localStorage", function ($scope, $rootScope, $location, $localStorage) {
    $scope.username = '';
    $scope.password = '';
    $scope.Users = [];
    $scope.tempUsers = [];
    debugger;
    if ($rootScope.CurrentUser)
    {
        $rootScope.CurrentUser = null;
        $rootScope.showButton = true;
    }    
    $scope.login = function ()
    {
        debugger;
        if ($rootScope.UserNames) {          
            $rootScope.UserNames.push({

            username: $scope.user.username,
            password: $scope.user.password
            });
        }
        else
            {       
        $rootScope.UserNames = 
        [{

            username: $scope.user.username,
            password: $scope.user.password
        }];
        }        
        $rootScope.CurrentUser = $scope.user.username;
        $rootScope.showButton = false;
        localStorage.setItem('allusers', JSON.stringify([$rootScope.UserNames]));        
        $location.path("/Game");
    }
    $scope.Save = function () {
        debugger;
        $scope.Users.push(
             {
                 username: $scope.user.username,
                 password: $scope.user.password
             }
        );
        localStorage.setItem('Users', JSON.stringify($scope.Users));
        //object1 = JSON.parse(localStorage.getItem("saved value"))[0];
        
    }
   
   
}]);