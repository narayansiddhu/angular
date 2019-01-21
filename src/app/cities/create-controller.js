'use strict';
angular.module('inspinia')
    .controller('citiesCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'citiesService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller,citiesService) {
        $scope.cities = {};
        // $scope.regEx = /^[0-9]{10,10}$/;
        citiesService.getList().then(function (data) {
            $scope.cities12 =data ;  
        });
        if ($state.current.breadcrumb.text == "Edit") {
            citiesService.edit($stateParams.id).then(function (data) {
                console.log($stateParams.id);
                console.log(data.result);
                $scope.cities.name=data.result.name;
                $scope.cities.country=data.result.country;
                $scope.cities.scrapingUrl=data.result.scrapingUrl;
                $scope.cities.scrapingWebsite=data.result.scrapingWebsite;
              });
          }
        // save / update api start here
        $scope.save = function (model) {
            var error = 0;
            $scope.errorsinp ={
                "name": "",
                "country": "",
                "scrapingUrl":"",
                "scrapingWebsite":""
              }
              if ($scope.cities.name == undefined || $scope.cities.name == '') {
                $scope.errorsinp.name = "Please enter city name";
                error++;
            }
            if ($scope.cities.country == undefined || $scope.cities.country == '') {
                $scope.errorsinp.country = "Please enter country name";
                error++;
            }
            if ($scope.cities.scrapingUrl == undefined || $scope.cities.scrapingUrl == '') {
                $scope.errorsinp.scrapingUrl = "Please enter scraping url";
                error++;
            }
            if ($scope.cities.scrapingWebsite == undefined || $scope.cities.scrapingWebsite == '') {
                $scope.errorsinp.scrapingWebsite = "Please enter scraping website";
                error++;
            }
            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    console.log($scope.cities);
                    citiesService.create($scope.cities).then(function (data) {
                        console.log(data);
                        $state.go('cities');
                        toaster.pop({
                            type: 'success',
                            title: 'City Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    citiesService.update($scope.cities, $stateParams.id).then(function (data) {
                        $state.go('cities');
                        toaster.pop({
                            type: 'success',
                            title: 'City Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    }]);