'use strict';

angular.module('inspinia').service('placesService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {
    //get cities Based on Country
    this.getcitiesByCountry = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/cities?filter[where][country]='+id).success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    //get cities Based on Country
    //get Places Based on City
    this.getplacesByCity = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places/cityBased?cityId='+id).success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    //get Places Based on City
    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places').success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    this.getzipcodedata = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/zipcodes?filter[where][zipcode]='+id).success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    this.getbusyhoursdata = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places/getPlaceBusyHouers?placeName='+id).success(function (data) {
           // console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }
    this.create = function (data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/places', data).then(function (data) {
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    this.edit = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/places/' + id).success(function (data) {

            D.resolve(data);
        });
        return D.promise;
    }
    this.delete = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/places/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.update = function (data,id) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/places/'+id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
