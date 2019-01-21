'use strict';

angular.module('inspinia')
    .controller('eventsListCtrl', function ($scope, $state, FileUploader, eventsService, toaster, $stateParams,configurationService, placesService, citiesService) {
        $scope.notfoundcity = "";
        $scope.notfoundplace = "";
        $scope.places = {};
        $scope.country="0";
        $scope.city="0";
        $scope.place="0";

        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;
        eventsService.getList().then(function (data) {
            $scope.events = data.result.list;
            console.log($scope.events);
        });
        $scope.placename = function(id){
            eventsService.getplacename().then(function (data) {
                $scope.events = data.result.list;
                console.log($scope.events);
            });
        }
        // get user list api end here
        $scope.countryChange = function (country) {
            console.log(country);
            $scope.places = {};
            $scope.city = "0";
            $scope.place="0";
            placesService.getcitiesByCountry(country).then(function (data) {
                console.log(data.result.list);
                $scope.cities = data.result.list;
                if (data.result.list.length == 0) {
                    $scope.notfoundcity = "Cities are not found";
                    $scope.notfoundplace = "Places are not found";
                    $scope.errorsinp.city = "";
                    $scope.errorsinp.place = "";
                }
                else {
                    $scope.notfoundcity = "";
                    $scope.notfoundplace = "";
                }
                // $scope.places = data.result.list;
                // console.log($scope.places);
            });
        };
        $scope.change = function (city) {
            $scope.place="0";
            placesService.getplacesByCity(city).then(function (data) {
                $scope.places = data.result.list;
                console.log($scope.places);
                if (data.result.list.length == 0) {
                    $scope.notfoundplace = "Places are not found";
                    $scope.errorsinp.place = "";
                }
                else {
                    $scope.notfoundplace = "";
                }
            });
        }
        $scope.save = function (place) {
            var error = 0;
            $scope.errorsinp = {
                "country": "",
                "city": "",
                "place":""
            }
            console.log($scope.notfoundcity);
            if ($scope.country == 0) {
                $scope.errorsinp.country = "Please select country";
                error++;
            }
            
            if ($scope.city == 0) {
                $scope.errorsinp.city = "Please select city ";
                error++;
            }
            
            if ($scope.place == 0) {
                $scope.errorsinp.place = "Please select place ";
                error++;
            }
            
            if ($scope.notfoundplace == "Places are not found") {
                $scope.errorsinp.place = "";
                error++;
            }
            if ($scope.notfoundcity == "Cities are not found") {
                $scope.errorsinp.city= "";
                error++;
            }
            if (error == 0) {
                eventsService.geteventsByPlace(place).then(function (data) {
                    $scope.events = data.result.events;
                    console.log(data.result);
                });
            }

        }
        //end Get Places by Cities
        $scope.countries = ["US", "India"]
        /********************Excel start  ***********************/
        $scope.exportToExcel = function () {
            alasql('SELECT * INTO XLSX("events.xlsx",{headers:true}) \
                    FROM HTML("#tableToExport",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete block api start here
        $scope.delete = function (id) {
            console.log(id);
            eventsService.delete(id).then(function (data) {
                console.log(data.result);
                if (data.result.count == 1) {
                    eventsService.getList().then(function (data) {
                        $scope.events = data.result.list;
                    });
                    toaster.success('Event Successfully Deleted!');


                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete block api end here

        $scope.edit = function (id) {
            $state.go('events.edit', {
                id: id
            });
        }
    });