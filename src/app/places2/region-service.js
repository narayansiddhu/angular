'use strict';

angular.module('inspinia').service('regionService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.addRegion = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/addFranchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data){
            D.resolve(data); 
        });
        return D.promise;
    }
     this.getCities = function(){
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/cities').success(function(data){
            D.resolve(data);
        });
        return D.promise;
    }

    this.listRegions = function() { 
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/addFranchises').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.deleteRegion = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/addFranchises/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getRegion = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/addFranchises/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getAllRegion = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/addFranchises/').success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getRegionByCategory = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories/'+id+'/addFranchises').success(function(data) {
            D.resolve(data);
        }).error(function(data) { 
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateRegion = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/addFranchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise; 
    }

}]);
