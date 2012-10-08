angular.module('powertools', ['itemservice']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:ItemsCtrl}).
            otherwise({redirectTo:'/'});
    });

function ItemsCtrl($scope, $http) {
    $scope.list = [];
    $scope.method = 'GET';
    $scope.url = '/api/item/';

    $scope.total = function() {
        var total = 0;

        $scope.list.forEach(function(item){
            total = total + item.medianprice;
        });

        return total;
    };

    $scope.addItem = function() {
        $scope.code = null;
        $scope.response = null;

        $http({method: $scope.method, url: $scope.url + $scope.itemName}).
            success(function(data, status) {
                $scope.status = status;
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
}