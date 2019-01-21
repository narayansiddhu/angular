'use strict';

angular.module('inspinia').service('blockService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/blocks/GetAllBlocks').success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    this.create = function (data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/blocks', data).then(function (data) {
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    this.edit = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/blocks/' + id).success(function (data) {

            D.resolve(data);
        });
        return D.promise;
    }
    this.delete = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/blocks/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.update = function (data,id) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/blocks/'+id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
