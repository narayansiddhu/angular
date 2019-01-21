'use strict';

angular.module('inspinia')
    .controller('RegionCreateCtrl', ['$scope', '$state', 'NgMap', 'PCService', 'toaster', 'regionService', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'stockService', 'FileUploader', 'configurationService', function($scope, $state, NgMap, PCService, toaster, regionService, $timeout, $stateParams, $rootScope, $uibModal, $log, stockService, FileUploader, configurationService) {

        var polygonInstance;
        var polygonData;
        var regionMap;
        var deliveryMap;
        $scope.regionCoors = [];
        $scope.franchiseModel = {};
        $scope.franchiseModel.savedAddress = {};
        $scope.franchiseModel.savedAddress.geopoint = {};
        $scope.selectedvalue = '';
        $scope.imgobj = [];
        $rootScope.mapLatLngValues = {
            lat: '',
            lng: '',
            data: {},
            message: ''
        };

        // polygon defined text start here
        $scope.definedRegion = $rootScope.regionDefine;

        $rootScope.pmapLatLngValues = {
            lat: '',
            lng: '',
            data: {},
            message: ''
        };

        $rootScope.selectedMaparea = {};

        // $scope.customerModel.dob =  new Date('24-01-1988');




        // map pop code start here

        $scope.open = function(index, selected, size) {

            NgMap.getMap('regionMap').then(function(map) {
                regionMap = map;
                google.maps.event.trigger(regionMap, 'resize');
            });

            $scope.Mapindex = index;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/places2/map.html',
                controller: 'regionMapController',
                size: size
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.getSelectedRegion = selectedItem;
                console.log($scope.getSelectedRegion);
                $rootScope.getSelectedFranchise = selectedItem;
                $rootScope.getSelectedRegion = $scope.getSelectedRegion;
                if ($scope.getSelectedRegion) {
                    $scope.regionDefine = "Franchises Defined";
                }
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // map pop code end here  
        // pcmap pop code start here

        $scope.open1 = function(index, selected, size) {
            //  console.log(selected);
            NgMap.getMap('billingmap').then(function(map) {
                regionMap = map;
                google.maps.event.trigger(regionMap, 'resize');
            });
            $scope.searchArea = "Hyderabad";

            $scope.Mapindex = index;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/places2/mapTemplate.html',
                controller: 'regionProcureMapCtrl',
                size: size,
                // resolve: { 
                //   items: function () {
                //     return $scope.items;
                //   }
                // }
            }); 

            modalInstance.result.then(function(selectedItem) {
                console.log(selectedItem);
                $rootScope.pmapLatLngValues = selectedItem;
                $scope.selectedMap = selectedItem;
                console.log($scope.selectedMap);
                latlngAddress($scope.selectedMap.data);

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.$watch('mapLatLngValues.data', function(newValues, oldValues) {
            if (newValues) {
                $scope.franchiseModel.coordinates = newValues.polygon;
            }
        });

        function latlngAddress(data) {
            $scope.franchiseModel.savedAddress = {}; 
            //console.log(data);
            _.each(data[0].address_components, function(component) {

                _.each(component.types, function(type) {

                    if (type === 'sublocality_level_2') {
                        $scope.franchiseModel.savedAddress.street = component.long_name;

                    }
                    if (type === 'sublocality_level_1') {
                        $scope.franchiseModel.savedAddress.area = component.long_name;
                    }
                    if (type === 'point_of_interest') {
                        $scope.franchiseModel.savedAddress.landmark = component.long_name;
                    }

                    if (type === 'administrative_area_level_1') {
                        $scope.franchiseModel.savedAddress.state = component.long_name;
                    }
                    if (type === 'administrative_area_level_2') {
                        $scope.franchiseModel.savedAddress.city = component.long_name;
                    }
                    if (type === 'postal_code') {
                        $scope.franchiseModel.savedAddress.pincode = Number(component.long_name);
                    }
                })
            })
        }

        // Display Data In Edit Region Start Here
        $scope.editRegion = function() {
            if ($state.current.breadcrumb.text == "Edit") {
                regionService.getRegion($stateParams.id).then(function(data) {
                    $scope.franchiseModel = data;
                    $rootScope.regionCoordinates = data;
                    $scope.selectedMaparea.lat = true;
                    $scope.franchiseModel.savedAddress = data.savedAddress[0];
                    if (data.imageURL.length != 0) {
                        $scope.showimage = true;
                        // console.log(data.imageURL);
                        $scope.imgobj = [];
                        _.each(data.imageURL, function(value, key) {
                            $scope.imgobj.push({ "url": value });
                        });
                        // console.log($scope.imgobj); 
                    } else {
                        $scope.showimage = false;
                    }
                });
            }
        }
        $scope.editRegion();

        // Display Data In Edit Region End Here

        $scope.save = function(model) {

            var error = 0;
            $scope.errorsinp = { "franchiseName": "", "description": "", "contactNumber": "", "landmark": "", "area": "", "city": "", "doorNoFlatNo": "", "street": "", "pincode": "" };
            if ($scope.franchiseModel.franchiseName == undefined || $scope.franchiseModel.franchiseName == '') {
                $scope.errorsinp.franchiseName = "Enter Franchise Name";
                error++;
            }
            if ($scope.franchiseModel.description == undefined || $scope.franchiseModel.description == '') {
                $scope.errorsinp.description = "Enter Franchise Description";
                error++;
            }
            if ($scope.franchiseModel.contactNumber == undefined || $scope.franchiseModel.contactNumber == '') {
                $scope.errorsinp.contactNumber = "Enter Contact Number";
                error++;
            }
            if ($scope.franchiseModel.savedAddress.landmark == undefined || $scope.franchiseModel.savedAddress.landmark == '') {
                $scope.errorsinp.landmark = "Enter landmark";
                error++;
            }
            if ($scope.franchiseModel.savedAddress.area == undefined || $scope.franchiseModel.savedAddress.area == '') {
                $scope.errorsinp.area = "Enter area";
                error++;
            }
            if ($scope.franchiseModel.savedAddress.doorNoFlatNo == undefined || $scope.franchiseModel.savedAddress.doorNoFlatNo == '') {
                $scope.errorsinp.city = "Enter Door No/FlatNo";
                error++;
            }
            if ($scope.franchiseModel.savedAddress.street == undefined || $scope.franchiseModel.savedAddress.street == '') {
                $scope.errorsinp.street = "Enter street";
                error++;
            }
            if ($scope.franchiseModel.savedAddress.pincode == undefined || $scope.franchiseModel.savedAddress.pincode == '') {
                $scope.errorsinp.pincode = "Enter pincode";
                error++;
            }

            if (error == 0) {
                var galImages = [];
                _.each($scope.imgobj, function(val, key) {
                    //console.log(val); 
                    galImages.push(val.url);
                });
                $scope.franchiseModel.imageURL = galImages;
                var modifySavedAddres = [];
                modifySavedAddres.push(model.savedAddress);
                model.savedAddress = modifySavedAddres;

                if ($state.current.breadcrumb.text == "Create") {
                    var tempCord = {};
                    tempCord.lat = $rootScope.pmapLatLngValues.lat;
                    tempCord.lng = $rootScope.pmapLatLngValues.lng;
                    model.savedAddress[0].geopoint = tempCord;   
                    //console.log($scope.getSelectedRegion);
                    model.coordinates = $scope.getSelectedRegion;
                    console.log(model);
                    regionService.addRegion(model).then(function(data) {
                        $state.go('places2');
                        toaster.pop({
                            type: 'success',
                            title: 'Franchises created',
                            showCloseButton: true

                        });
                    }) 
                } else { 
                    if ($rootScope.pmapLatLngValues.lat != "") {
                        var tempCord = {};
                        tempCord.lat = $rootScope.pmapLatLngValues.lat;
                        tempCord.lng = $rootScope.pmapLatLngValues.lng;
                        model.savedAddress[0].geopoint = tempCord;
                    }
                    if($rootScope.getSelectedFranchise){
                        model.coordinates = $rootScope.getSelectedFranchise;
                    }
                    console.log(model);
                    regionService.updateRegion(model).then(function(data) {
                        $state.go('places2');   
                        toaster.pop({
                            type: 'success',
                            title: 'Franchises Updated Successfully',
                            showCloseButton: true

                        });
                    })  
                }
            }
        }


        // Multiple Image Uploads
        var fileurl = configurationService.baseUrl();

        $scope.baseurlimg = fileurl;

        var uploader = $scope.uploader = new FileUploader({
            url: fileurl + '/containers/franchiseImages/upload'
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
            // console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            // console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            // console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            // console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            // console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(item, response, status, headers) {
            console.log(response);
            $scope.errorimg = '';
            $scope.img = response;
            if ($scope.img.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in product image');
            } else {
                var imageURL = '/containers/franchiseImages/download/' + $scope.img.result.files.file[0].name;
                $scope.imgobj.push({ 'url': imageURL });
                console.log($scope.imgobj);
            }
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            // console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            // console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            // console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            //console.info('onCompleteAll');
        };

        $scope.deleteimg = function(id) {

            $scope.imgobj.splice(id, 1);
        }

        //  console.info('uploader', uploader);

        // Multiple Image Uploads End Here

    }]);
