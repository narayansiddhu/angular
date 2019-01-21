'use strict';

angular.module('inspinia')
    .controller('RegionListCtrl', function($scope, $state, regionService, toaster, $stateParams, stockService, $timeout) {
        var vm = this;
        //console.log($stateParams);
        if ($state.current.data) {
            // console.log($state.current.data.pageTitle);
        }

        // list franchise start here
        $scope.listFranchises = function() {
            regionService.listRegions().then(function(data) {
                vm.list = data;
                $scope.franchiseList = data;
                $scope.franchiseCount = data.length;  
            });
        }
        $scope.listFranchises(); 
        // list franchise end here


        vm.view = function(id) {
                // $state.go('customers.view', {
                //     id: id
                // });
            }
            // Back To Category From Subcategory Start Here
        $scope.backToRegion = function() {
            // console.log("*********Back To Region***********");
            $state.go('regions.create', { id: $stateParams.catId });
        }
        $scope.backToCategory = function() {
            $state.go('stock.categories_create');
        }

        $scope.createRegion = function() {
            //  console.log("*********Back Region***********");
            $state.go('regions.create', { id: $stateParams.catId });
        }


        $scope.edit = function(id, catId) {

            $state.go('franchises.edit', { id: id, catId: catId });
        }

        $scope.addRegion = function() {

            //console.log("******** Add Region ********");

            $state.go('regions.create', { id: $stateParams.catId });
        }

        $scope.addRoot = function() {

            //console.log("******** Add Roots ********");

            $state.go('routes.create', { id: $stateParams.catId });
        }

        $scope.delete = function(id) { 
            regionService.deleteRegion(id).then(function(data) {
                if (data.count == 1) {
                    toaster.success('User Successfully Deleted!');
                    regionService.listRegions().then(function(data) {
                        $scope.regionList.list = data;
                        $state.go('franchises');
                    })
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }
    });
