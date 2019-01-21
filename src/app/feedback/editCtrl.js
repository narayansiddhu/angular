'use strict';
angular.module('inspinia')
    .controller('eventseditCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller','eventsService','placesService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller,eventsService,placesService) {
        $scope.events = {};
        $scope.appartment = {};
        $scope.DPhotogetImage = false;
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;
        // end places
        if ($state.current.breadcrumb.text == "Edit") {
            eventsService.edit($stateParams.id).then(function (data) {
                
                $scope.events=data.result.list[0];
                $scope.country = data.result.list[0].place.city.country;
                $scope.city = data.result.list[0].place.cityId;

                $scope.countryChange(data.result.list[0].place.city.country);
                $scope.cityChange(data.result.list[0].place.cityId);
                $scope.DPhotogetImage = true;
                $scope.appartment.logo = data.result.list[0].eventImage;
                // $scope.events=data.result.events;
            });
        }
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
        // save / update api start here
        $scope.save = function (model) {
            console.log(model);
            $scope.events=model;
            var error = 0;
            $scope.errorsinp ={
                "title": "",
                "description": "",
              }
              if ($scope.events.title == undefined || $scope.events.title == '') {
                $scope.errorsinp.title = "Please enter event title ";
                error++;
            }
            if ($scope.events.description == undefined || $scope.events.description == '') {
                $scope.errorsinp.description = "Please enter description";
                error++;
            }
            if (error == 0) {
                $scope.events.eventImage = $scope.appartment.logo;
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
    }]);