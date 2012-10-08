angular.module('itemservice', ['ngResource']).
    factory('Item', function($resource) {
        return Item = $resource('api/item/:keyword');
    });