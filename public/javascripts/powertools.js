angular.module('dbaService', ['ngResource']).
    factory('Item', function($resource){
        return $resource('api/items/:itemName');
    });

var powertools = angular.module('powertools',['dbaService']);

powertools.controller('ItemsCtrl', function ($scope, $http, Item) {
    $scope.list = [];

    $scope.addItem = function() {
        $scope.list.push(Item.get({itemName: $scope.itemName}));
        $scope.itemName = '';
    };

    $scope.total = function() {
        var total = 0;
        $scope.list.forEach(function(item){
            if (typeof item.median_price !== 'undefined') {
                total = total + item.median_price;
            }
        });
        return total;
    };

    $scope.loading = function() {
        var list_length = $scope.list.length,
            last_item = (typeof $scope.list[list_length - 1] !== 'undefined') ? $scope.list[list_length - 1] : '';
        return $scope.list.length > 0 && !!(typeof last_item.name === 'undefined');
    };

    $scope.removeItem = function() {
        $scope.list.splice(this.$index,1);
    };

});
