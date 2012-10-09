var powertools = angular.module('powertools',[]);

powertools.controller('ItemsCtrl', function ($scope, $http) {
    $scope.list = [];

    $scope.total = function() {
        var total = 0;

        $scope.list.forEach(function(item){
            total = total + item.medianprice;
        });

        return total;
    };

    $scope.addItem = function() {
        $http({method: 'GET', url: '/api/item/' + $scope.itemName}).
            success(function(data, status) {
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
