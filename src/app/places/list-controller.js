'use strict';

angular.module('inspinia')
    .controller('placesListCtrl', function ($scope, $state, FileUploader, toaster, $stateParams, placesService, citiesService) {
        //start get cities By Country
        $scope.notfounError = "";
        $scope.country = "0";
        $scope.cities = {};
        $scope.city = "0";
        $scope.loading="";
        $scope.countryChange = function (country) {
            $scope.city = "0";
            console.log(country);
            placesService.getcitiesByCountry(country).then(function (data) {
                console.log(data.result.list);
                $scope.cities = data.result.list;
                if (data.result.list.length == 0) {
                    $scope.notfounError = "cities are not found";
                    $scope.errorsinp.city="";
                }
                else{
                    $scope.notfounError = ""; 
                }
            });
        };
        //End get cities by Contry
        //Start get places by City
        $scope.cityChange = function (city) {
            var error = 0;
            $scope.errorsinp = {
                "country": "",
                "city": ""
            }
            if ($scope.country == 0 || $scope.country == '') {
                $scope.errorsinp.country = "Please select country";
                error++;
            }
            if ($scope.city == 0) {
                $scope.errorsinp.city = "Please select city ";
                error++;
            }
            if($scope.notfounError == "cities are not found"){
                $scope.errorsinp.city = "";
            }
            
            if (error == 0) {
                console.log(city);
                placesService.getplacesByCity(city).then(function (data) {
                    $scope.places = data.result.list;
                    
                });
            }

        };
        //End get places by City


        // get user list api end here
        /********************Excel start  ***********************/
        $scope.exportToExcel = function () {
            alasql('SELECT * INTO XLSX("places.xlsx",{headers:true}) \
               FROM HTML("#tableToExport",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete block api start here
        $scope.delete = function (id) {
            console.log(id);
            placesService.delete(id).then(function (data) {
                console.log(data.result);
                if (data.result.count == 1) {
                    placesService.getList().then(function (data) {
                        $scope.places = data.result.list;
                    });
                    toaster.success('Place Successfully Deleted!');


                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete block api end here

        $scope.edit = function (id) {
            $state.go('places.edit', {
                id: id
            });
        }
    });

    // $(document).ready(function() {
    //     $('#example').DataTable( {
    //         "scrollY": 200,
    //         "scrollX": true
    //     } );
    // } );