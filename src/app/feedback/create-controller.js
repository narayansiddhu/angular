'use strict';
angular.module('inspinia')
    .controller('feedbackCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller','eventsService','placesService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller,eventsService,placesService) {
        $scope.events = {};
        $scope.notfoundcity = "";
        $scope.notfoundplace = "";
        $scope.appartment = {};
        // $scope.regEx = /^[0-9]{10,10}$/;
        // eventsService.getList().then(function (data) {
        //     $scope.events =data ;  
        // });
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;
        $scope.countryChange = function (country) {
            console.log(country);
            placesService.getcitiesByCountry(country).then(function (data) {
                console.log(data.result.list);
                $scope.cities=data.result.list;
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
         //Start get places by City
         $scope.cityChange = function (city) {
            console.log(city);
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
        };
        //End get places by City
        //get places
        // placesService.getList().then(function (data) {
        //     $scope.places = data.result.list;
        //     console.log($scope.places);
        // });
        // end places
        if ($state.current.breadcrumb.text == "Edit") {
            eventsService.edit($stateParams.id).then(function (data) {
                console.log($stateParams.id);
                console.log(data.result);
                $scope.events=data.result;
                // $scope.events=data.result.events;
              });
          }
        // save / update api start here


        $scope.apartment_logo = function () {
            var img_div = angular.element(document.querySelector('#apartment_logo'));
            img_div.addClass('remove_img');
        }

        var logo_appartment = $scope.logo_appartment = new FileUploader({
            scope: $scope,
            url: fileurl + '/containers/users/upload',
            formData: [
                { key: 'value' }
            ]
        });

        logo_appartment.onSuccessItem = function (item, response, status, headers) {
            $scope.appartmentAddLogo = response;
            console.log($scope.appartmentAddLogo.result.result.files.file);
            if ($scope.appartmentAddLogo.result.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in upload image');
            } else {
                $scope.logo_address = '/containers/users/download/' + $scope.appartmentAddLogo.result.result.files.file[0].name;
                $scope.DPhotogetImage = true;
                $scope.appartment.logo = $scope.logo_address;
            }
        };
        // logo upload end here
        $scope.save = function (model) {
            console.log(model);
            $scope.events=model;
            var error = 0;
            $scope.errorsinp ={
                "title": "",
                "description": "",
                "country": "",
                "city": "",
                "place":"",
                "eventimage":""
            }
            if ($scope.events.title == undefined || $scope.events.title == '') {
                $scope.errorsinp.title = "Please enter event title ";
                error++;
            }
            if($scope.appartment.logo==""|| $scope.appartment.logo == undefined){
                $scope.errorsinp.eventimage = "Please upload Image ";
                error++;
            }
            if ($scope.events.description == undefined || $scope.events.description == '') {
                $scope.errorsinp.description = "Please enter description";
                error++;
            }
            if ($scope.country == undefined || $scope.country == '') {
                $scope.errorsinp.country = "Please select country";
                error++;
            }
            if ($scope.events.cityId == undefined || $scope.events.cityId == '') {
                $scope.errorsinp.city = "Please select city ";
                error++;
            }
            if ($scope.events.placeId == undefined || $scope.events.placeId == '') {
                $scope.errorsinp.place = "Please select place ";
                error++;
            }
            if ($scope.notfoundcity == "cities are not found") {
                $scope.errorsinp.city = "";
            }
            if ($scope.notfoundplace == "Places are not found") {
                $scope.errorsinp.place = "";
            }
            if (error == 0) {
                $scope.events.eventImage = $scope.appartment.logo;
                if ($state.current.breadcrumb.text == "Create") {
                    eventsService.create($scope.events).then(function (data) {
                        console.log(data);
                        $state.go('events');
                        toaster.pop({
                            type: 'success',
                            title: 'Event Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    eventsService.update($scope.events, $stateParams.id).then(function (data) {
                        $state.go('events');
                        toaster.pop({
                            type: 'success',
                            title: 'Event Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    }]);