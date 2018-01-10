angular.module('app').controller('app_barcode', app_barcode);
function app_barcode($scope, app) {
    'use strict';
    app.init($scope);
    $scope.reset = function () {
        $scope.data = {};
    };
    $scope.scan = function () {
        cordova.plugins.barcodeScanner.scan(function (result) {
            setTimeout(function () {
                $scope.data.format = result.format;
                $scope.data.text = result.text;
                $scope.$digest();
            }, 0);
        }, function (error) {
        }, {
            'preferFrontCamera': false,
            'showFlipCameraButton': true,
            'showTorchButton': true,
            'orientation': 'landscape'
        });
    };
}