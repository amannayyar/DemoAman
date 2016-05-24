/// <reference path="Scripts/angular.min.js" />
var Gamingapp = angular.module("TicTac", ['ngRoute', "ngStorage"]);
Gamingapp.controller("IndexController", ["$scope", "$rootScope", function ($scope, $rootScope)
{
    $rootScope.showButton = true;  
    //alert($rootScope.showButton);
}])
.config(['$routeProvider', function ($routeProvider)
{
    $routeProvider
    //.when('/', {
    //    templateUrl: 'Index.html',
    //    controller: 'IndexController1'
    //})
    .when('/Game', {
        templateUrl: '/Templates/TicTac.html',
        controller: 'TicTacToe'
    })
    .when('/rootScopes',
    {
        templateUrl: '/Templates/rootScope.html',
        controller: 'RootScopeController'
    })
    .when('/Login', {
        templateUrl: '/Templates/Login.html',
        controller: 'UserController'
    })
        .when('/Logout',
        {
            templateUrl: '/Templates/Login.html',
            controller: 'UserController'
        }
        )
        .when('/Dashboard', {
            templateUrl: '/Templates/Dashboard.html',
            controller: 'DashboardController'
        })
    .otherwise({
        redirectTo: '/'
    });

}]);