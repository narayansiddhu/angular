'use strict';

angular.module('inspinia')
    .controller('adminDashboardCtrl', function ($scope,  $state, toaster, dashboardService, $controller) {
        $scope.totalUsersCount ="";
        $scope.totalBlocksCount ="";
        $scope.totalProjectsCount ="";
        
        //Total projects Count
        dashboardService.getList().then(function (counts) {
            $scope.totalUsersCount = counts.result.count;
            
            console.log($scope.totalUsersCount);
        
        });
        dashboardService.getBlocksList().then(function (counts) {
            $scope.totalBlocksCount = counts.result.count;
            
        });
        dashboardService.getProjectsList().then(function (counts) {
            $scope.totalProjectsCount = counts.result.count;
            
        });
        dashboardService.getflatscount().then(function (counts) {
            $scope.totalflats = counts.result.count;
            
        });
         
        
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
        //$scope.data = [$scope.totalUsersCount, $scope.totalBlocksCount, $scope.totalProjectsCount];
        $scope.labels1 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
          $scope.series1 = ['Series A', 'Series B'];

          $scope.data1 = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ];


          $scope.labelsr =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.datar = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
    });
