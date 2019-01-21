'use strict';

angular.module('inspinia').service('loginService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    this.getLogin = function (data) {
        var D = $q.defer()
        $http.post('http://52.77.201.220:3046/api/admins/login?include=user', data).success(function (data) {
            D.resolve(data);
        })
            .error(function (data) {
                D.resolve(data);
            });
        return D.promise;
    }

}]);
