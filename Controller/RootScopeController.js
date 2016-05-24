/// <reference path="../Scripts/angular.min.js" />
Gamingapp.controller('RootScopeController', ["$scope", "$rootScope", function ( $scope,$rootScope)
{  
    $scope.val = $rootScope.val;
}])
