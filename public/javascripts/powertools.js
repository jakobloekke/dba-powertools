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
            if (typeof item.medianprice !== 'undefined') {
                total = total + item.medianprice;
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
    }
});





powertools.controller('Old_ItemsCtrl', function ($scope, $http) {
    $scope.list = [];

    $scope.total = function() {
        var total = 0;

        $scope.list.forEach(function(item){
            total = total + item.medianprice;
        });

        return total;
    };

    $scope.addItem = function() {
        $http({method: 'GET', url: '/api/items/' + $scope.itemName}).
            success(function(data) {
                $scope.data = data;

                //Update list:
                $scope.list.push(
                    {
                        name: $scope.itemName,
                        count: $scope.data.prices.length,
                        medianprice: $scope.data.median_price,
                        averageprice: $scope.data.average_price
                    }
                );

                $scope.itemName = '';

            }).
            error(function(data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });
    };

    $scope.removeItem = function() {
        $scope.list.splice(this.$index,1);
    }
});
