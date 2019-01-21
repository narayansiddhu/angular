'use strict';
angular.module('inspinia')
    .controller('placesCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller','placesService','citiesService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller,placesService,citiesService) {
        $scope.list={};
        $scope.country = "0";
        $scope.list.polyCoordinates = [
            {
                "lat":0,
                "lng":0
            },
            {
                "lat":0,
                "lng":0
            }
        ]
        $scope.list.race = [
            {
                "interested":"race1",
                "count":0
            },
            {
                "interested":"race2",
                "count":0
            },
            {
                "interested":"race3",
                "count":0
            },
            {
                "interested":"race4",
                "count":0
            },
            {
                "interested":"race5",
                "count":0
            }
        ];
        $scope.list.interest = [
            {
                "interested":"lesbian",
                "count":0
            },
            {
                "interested":"gay",
                "count":0
            },
            {
                "interested":"straight",
                "count":0
            },
            {
                "interested":"bisexual",
                "count":0
            }
        ];
        $scope.list.gender = [
            {
                "gender":"male",
                "count":0
            },
            {
                "gender":"female",
                "count":0
            },
            {
                "gender":"other",
                "count":0
            }
        ];
        
        $scope.list.busyHours = [
            {
              "day": "Sunday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              "day": "Monday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              "day": "Tuesday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              "day": "Wednesday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              "day": "Thursday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              "day": "Friday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              "day": "Saturday",
              "hours": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            }
        ];
        $scope.countryChange = function (country) {
            
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

        $scope.getzipdata = function(id){
            $scope.list.race = [
                {
                    "interested":"race1",
                    "count":0
                },
                {
                    "interested":"race2",
                    "count":0
                },
                {
                    "interested":"race3",
                    "count":0
                },
                {
                    "interested":"race4",
                    "count":0
                },
                {
                    "interested":"race5",
                    "count":0
                }
            ];
            $scope.list.gender = [
                {
                    "gender":"male",
                    "count":0
                },
                {
                    "gender":"female",
                    "count":0
                },
                {
                    "gender":"other",
                    "count":0
                }
            ];
            placesService.getzipcodedata(id).then(function (data) {
                if(!id){
                    alert('Please Enter Code');
                }
                console.log(data.result.list);
                $scope.list.race = [
                    {
                        "interested":"race1",
                        "count":data.result.list[0].totalWhitePopulation
                    },
                    {
                        "interested":"race2",
                        "count":data.result.list[0].totalBlackPopulation
                    },
                    {
                        "interested":"race3",
                        "count":data.result.list[0].asianPopulation
                    },
                    {
                        "interested":"race4",
                        "count":data.result.list[0].totalLatinoPopulation
                    },
                    {
                        "interested":"race5",
                        "count":data.result.list[0].indianPopulation
                    }
                ];
                
                $scope.list.gender = [
                    {
                        "gender":"male",
                        "count":data.result.list[0].totalMalePopulation
                    },
                    {
                        "gender":"female",
                        "count":data.result.list[0].totalFemalePopulation
                    },
                    {
                        "gender":"other",
                        "count":0
                    }
                ];
                
                
            });
        }
        $scope.getbusyhours = function(name, address){
            if(!name){
                alert('Please Enter Name');
            }
            if(!address){
                alert('Please Enter address');
            }
            if(address&&name){
                var fulltext = name+", "+address;
                placesService.getbusyhoursdata(fulltext).then(function (data) {
                    console.log(data.result.list);
                    $scope.list.busyHours = data.result.list;
                });
            }
        }
        // citiesService.getList().then(function (data) {
        //     $scope.cities = data.result.list;
        // });
        if ($state.current.breadcrumb.text == "Edit") {
            citiesService.getList().then(function (data) {
                $scope.cities = data.result.list;
            });
            placesService.edit($stateParams.id).then(function (data) {
                console.log(data);
                $scope.list = data.result;
                if(data.result.busyHours.length!=0){
                    $scope.list.busyHours = data.result.busyHours
                }else{
                    $scope.list.busyHours = $scope.busyHours;
                }
              });
          }
        // save / update api start here
        $scope.save = function () {
            console.log($scope.list);
            var error = 0;
            $scope.errorsinp ={
                "name": "",
                "address": "",
                "zipcode": "",
                "categories": "",
                "lat": "",
                "lng": "",
                "polyCoordinates": "",
                "cityId": "",
                "favouriteCount":""
            }
            if ($scope.list.name == undefined || $scope.list.name== '') {
                $scope.errorsinp.name = "Please enter name ";
                error++;
            }
            if ($scope.list.address == undefined || $scope.list.address == '') {
                $scope.errorsinp.address = "Please enter address";
                error++;
            }
            if ($scope.list.zipcode == undefined || $scope.list.zipcode == '') {
                $scope.errorsinp.zipcode = "Please enter zipcode";
                error++;
            }
            if ($scope.list.categories == undefined || $scope.list.categories == '') {
                $scope.errorsinp.categories = "Please enter categories";
                error++;
            }
            if ($scope.list.location.lat == undefined || $scope.list.location.lng == '') {
                $scope.errorsinp.lat = "Please enter lat value";
                error++;
            }
            if ($scope.list.location.lng == undefined || $scope.list.location.lng == '') {
                $scope.errorsinp.lng = "Please enter lng value";
                error++;
            }
            // if ($scope.polyCoordinates == undefined || $scope.polyCoordinates == '') {
            //     $scope.errorsinp.polyCoordinates = "Please enter polyCoordinates";
            //     error++;
            // }
            if ($scope.list.cityId == undefined || $scope.list.cityId == '') {
                $scope.errorsinp.cityId = "Please enter city";
                error++;
            }
            if ($scope.list.favouriteCount == undefined || $scope.list.favouriteCount == '') {
                $scope.errorsinp.favouriteCount = "Please enter favouriteCount";
                error++;
            }      
            
            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    $scope.list.categories = [$scope.list.categories]
                    console.log($scope.list);
                    placesService.create($scope.list).then(function (data) {
                        console.log(data);
                        $state.go('places');
                        toaster.pop({
                            type: 'success',
                            title: 'Place Created Successfully',
                            showCloseButton: true
                        });
                    });
                } else {
                    console.log($scope.list);
                    placesService.update($scope.list, $stateParams.id).then(function (data) {
                        $state.go('places');
                        toaster.pop({
                            type: 'success',
                            title: 'Place Updated Successfully',
                            showCloseButton: true
                        });
                    });
                }
            }
        }
        $scope.collapseAll = function(data) {
            for(var i in $scope.accordianData) {
                if($scope.accordianData[i] != data) {
                    $scope.accordianData[i].expanded = false;   
                }
            }
            data.expanded = !data.expanded;
         };
    }]);