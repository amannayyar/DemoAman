/// <reference path="../Scripts/angular.min.js" />
var app = angular.module("CustomDirective", []);
app.controller("CustomDirectiveController", function ($scope) {
    $scope.InputNo = 1;
    //alert($scope.InputNo);
    $scope.customer = {
        name: 'Aman',
        address: 'New Delhi'
    };
});


app.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function ($scope) {
            $scope.$watch('InputNo', function (newValue, oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                //if (isNaN(newValue)) {
                //    scope.wks.number = oldValue;
                //}
            });
        }
    };

});


app.directive('clickCounter', function () {
    debugger;
    return {

        //restrict : 'A',
        link: function ($scope, $element, attrs) {
            //element is the jqLite-wrapped element that this directive matches. It is the DOM element in HTML the directive is applied on.
            
            $element.on('click', function (event) {
                if (attrs['clickCounter'] in $scope) {
                    debugger;
                    $scope[attrs['clickCounter']]++;
                }
                else $scope[attrs['clickCounter']] = 1;
                $scope.$apply();
            })
        }
    }
});
app.directive('insertMyTemplate', function () {
    return {
        template: 'Name:{{customer.name}} Address:{{customer.address}}'
    }
})
app.directive('showdata', function () {
    return    {
        template: 'Name:{{customer.name}} Address:{{customer.address}}'
    }
})





