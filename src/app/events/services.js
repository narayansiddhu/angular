'use strict';

angular.module('inspinia').service('eventsService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject
    //get Events By PlaceId
    this.geteventsByPlace = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places/details?placeId='+id).success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    //end get Events By PlaceId
    this.getplacename = function(id){
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places/'+id).success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/events?filter[include][place][city]').success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    this.create = function (data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/events', data).then(function (data) {
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    this.edit = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/events?filter[include][place][city]&filter[where][id]=' + id).success(function (data) {

            D.resolve(data);
        });
        return D.promise;
    }
    this.delete = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/events/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.update = function (data,id) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/events/'+id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
