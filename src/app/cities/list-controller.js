'use strict';

angular.module('inspinia')
    .controller('citiesListCtrl', function ($scope, $state, FileUploader, citiesService, toaster, $stateParams) {
        citiesService.getList().then(function (data) {
                 $scope.cities = data.result.list;  
            });
        // get user list api end here
        /********************Excel start  ***********************/
        $scope.exportToExcel = function () {
            alasql('SELECT * INTO XLSX("cities.xlsx",{headers:true}) \
                    FROM HTML("#tableToExport",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete block api start here
        $scope.delete = function (id) {
            console.log(id);
            citiesService.delete(id).then(function (data) {
                console.log(data.result);
                if (data.result.count == 1) {
                    citiesService.getList().then(function (data) {
                        $scope.cities = data.result.list;  
                    });
                    toaster.success('City Successfully Deleted!');
                     

                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete block api end here

        $scope.edit = function (id) {
            $state.go('cities.edit', {
                id: id
            });
        }
    });