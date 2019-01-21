'use strict';

angular.module('inspinia').service('dashboardService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {
    this.getList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/users/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }
    // get blocks count
    this.getBlocksList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/cities/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }
    // End blocks count
    //get projects count
    this.getProjectsList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }

    this.getflatscount = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/events/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }
     //End get projects count
}]);
