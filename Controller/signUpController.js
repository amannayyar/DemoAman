/// <reference path="../Scripts/angular.min.js" />
Gamingapp.controller("signUpController", ['$scope', "$rootScope", "$localStorage", function ($scope, $rootScope, $localStorage) {
    //alert("Called");

    $scope.signUP = function (signUP) {
        debugger;
        var tempdata;
        tempdata = JSON.parse(localStorage.getItem('allRegisteredUsers'));
        if (tempdata) {
            $rootScope.registeredUsers = tempdata;
        }
        if ($rootScope.registeredUsers) {
            //***Check Whether User Already Exists***///
            var existingUser = $rootScope.registeredUsers.filter(function (item) {
                // return item.email == $scope.user.newuseremail || item.username == $scope.user.newusername;
                return item.username == $scope.user.newusername;
            });
            if (existingUser) {
                if (existingUser.length > 0) {
                    alert("User Already Exists with the same Name.");
                    return false;
                }
            }
            $rootScope.registeredUsers.push({

                username: $scope.user.newusername,
                password: $scope.user.newuserpassword,
                // email: $scope.user.newuseremail
            });
        }
        else {
            $rootScope.registeredUsers =
            [{

                username: $scope.user.newusername,
                password: $scope.user.newuserpassword,
                // email: $scope.user.newuseremail
            }];
        }
        localStorage.setItem('allRegisteredUsers', JSON.stringify($rootScope.registeredUsers));
        alert("Registered Successfully");
        $scope.user = '';
    }

}]);
