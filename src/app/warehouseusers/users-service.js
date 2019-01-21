'use strict';

angular.module('inspinia').service('wareHouseUsersService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.addHouseUser = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/warehouseUsers', data).success(function(data) {
            D.resolve(data);
        }).error(function(data){
            D.resolve(data); 
        });
        return D.promise;
    }

    this.listHouseUser = function() { 
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/warehouseUsers').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.deleteHouseUser = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/warehouseUsers/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getHouseUser = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/warehouseUsers/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
    this.updateHouseUser = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/warehouseUsers', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise; 
    }

}]);
