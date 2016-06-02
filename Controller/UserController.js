/// <reference path="../Scripts/angular.min.js" />
Gamingapp.controller("UserController", ['$scope', "$rootScope", "$location", "$localStorage", "SonService", "$q", function ($scope, $rootScope, $location, $localStorage, SonService, $q) {
    $scope.username = '';
    $scope.password = '';
    $scope.Users = [];
    $scope.tempUsers = [];
    debugger;
    if ($rootScope.CurrentUser) {
        $rootScope.CurrentUser = null;
        $rootScope.showButton = true;
    }
    $scope.login = function () {
        debugger;

        ///****Validate User with the User Name & Password***///
        var tempdata;
        tempdata = JSON.parse(localStorage.getItem('allRegisteredUsers'));
        if (tempdata) {
            var isUserExists;
            isUserExists = tempdata.filter(function (item) {
                return item.username == $scope.user.username.toLowerCase();
            });

            if (isUserExists) {
                if (isUserExists.length > 0) {

                    var passwordMatch;
                    passwordMatch = tempdata.filter(function (item) {
                        return item.password == $scope.user.password && item.username == $scope.user.username;
                    });
                    if (passwordMatch.length == 0) {
                        alert("Wrong Password.");
                        return false;
                    }
                }
                else {
                    alert("User does not exists.");
                    return false;
                }
            }
        }
        else {
            alert("User does not exists.");
            $scope.user.username = '';
            $scope.user.password = '';
            return false;
        }

        if ($rootScope.UserNames) {
            $rootScope.UserNames.push({

                username: $scope.user.username,
                password: $scope.user.password
            });
        }
        else {
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

    ///Promises
    $scope.makePromiseWithSon = function () {

        debugger;
        // This service's function returns a promise, but we'll deal with that shortly
        SonService.getWeather()

            // then() called when son gets back
            .then(function (data) {
                debugger;

                SonService.getWeather().then(function (data) {
                    // promise fulfilled
                    alert(data1);
                    if (data.records) {
                        alert("a");
                        //prepareFishingTrip();
                    } else {
                        alert("b");
                        //prepareSundayRoastDinner();
                    }
                });
            }, function (error) {
                alert("c");
                // promise rejected, could log the error with: console.log('error', error);
                //prepareSundayRoastDinner();
            });
    };

    //Another Example of Promises
    //function asyncGreet(name) {
    //    //alert("Called");
    //    debugger;
    //    var deferred = $q.defer();

    //    setTimeout(function () {
    //        debugger;
    //        deferred.notify('About to greet ' + name + '.');

    //        if (!name) {
    //            deferred.resolve('Hello, ' + name + '!');
    //        } else {
    //            deferred.reject('Greeting ' + name + ' is not allowed.');
    //        }
    //    }, 1000);

    //    return deferred.promise;
    //}

    //var promise = asyncGreet('Robin Hood');
    //debugger;
    //    promise.then(function (greeting) {
    //        alert('Success: ' + greeting);
    //    }, function (reason) {
    //        alert('Failed: ' + reason);
    //    }, function (update) {
    //        alert('Got notification: ' + update);
    //    });


}]);
Gamingapp.factory('SonService', function ($http, $q) {
    debugger;
    return {
        getWeather: function () {
            debugger;
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('http://www.w3schools.com/angular/customers.php')
                .then(function (response) {
                    debugger;
                    if (typeof response.data === 'object') {
                        alert("Data returns from the API");
                        return response.data;
                    } else {
                        // invalid response                        
                        return $q.reject(response.data);
                    }

                }, function (response) {

                    // something went wrong
                    alert("Called when API Link is wrong");
                    return $q.reject(response.data);
                });
        }
    };
});