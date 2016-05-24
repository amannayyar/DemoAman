/// <reference path="../Scripts/angular.min.js" />
Gamingapp.controller("LogoutController", ['$scope', "$rootScope", function ($scope, $rootScope) {
    if ($rootScope.CurrentUser)
    {
        $rootScope.CurrentUser = '';
    }
}]);