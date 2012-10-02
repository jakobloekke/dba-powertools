function ItemsCtrl($scope) {
    $scope.list = ["audi", "iphone"];


    $scope.addItem = function() {
        $scope.list.push($scope.itemName);
        $scope.itemName = '';
    };
}