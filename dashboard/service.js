'use strict';

angular.module('inspinia').service('dashboardService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {
    this.getList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/customerData/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }
    // get blocks count
    this.getBlocksList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/blocks/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }
    // End blocks count
    //get projects count
    this.getProjectsList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/projects/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }

    this.getflatscount = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/flats/count').success(function(data) {
            D.resolve(data);
        }); 
        return D.promise;
    }
     //End get projects count
}]);
