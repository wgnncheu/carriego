angular.module('app').controller('app_login', app_login);
function app_login($scope, app, $q) {
    'use strict';
    app.init($scope);
    if (!$scope.data) {
        $scope.data = {};
    }
    var checkSupport = function () {
        var deferred = $q.defer();
        if (typeof cordova !== 'undefined' && window.plugins && window.plugins.touchid) {
            window.plugins.touchid.isAvailable(function () {
                window.plugins.touchid.has('credentials', function () {
                    deferred.resolve(true);
                }, function () {
                    deferred.resolve(false);
                });
            });
        }
        return deferred.promise;
    };
    $scope.loginViaTouch = function () {
        checkSupport().then(function (isAvailable) {
            if (isAvailable) {
                window.plugins.touchid.verify('credentials', ' ', function (stringCreds) {
                    var credentials = JSON.parse(stringCreds);
                    $scope.data.username = credentials.username;
                    $scope.data.password = credentials.password;
                    $scope.$apply();
                    $scope.doLogin(credentials);
                }, function (err) {
                    alert(err);
                });
            } else {
                alert('touch id is not available');
            }
        });
    };
    $scope.reset = function () {
        localStorage.clear();
    };
    $scope.login = function () {
        $scope.doLoginOA2({
            username: $scope.data.username,
            password: $scope.data.password
        }, false);
    };
    
     $scope.doLoginOA2 = function (credentials, useWebsocket) {
        $scope.app.showLoading('Logging in');

            $.oauth2({
            auth_url: '',           // required
            response_type: 'code id_token token',      // required  - "code"/"token"
            token_url: '',          // required for response_type ="code"
            logout_url: '',         // recommended if available
            client_id: 'opclient_mvc',          // required
            client_secret: 'Fq7f4zjDmztg4vbf',      // required for response_type ="code"
            redirect_uri: '',       // required - any dummy url http://www.yourcompany.com
            other_params: { Scope: 'openid offline_access profile CollabPrtl Discrete Atlas rest_access Baan' , RefreshExpiry: '2592000', AccessExpiry:'3600'  }         // optional params object for scope, state, ...
        }, function(token, response){
            // do something with token or response
            $scope.token = token;
        }, function(error, response){
            // do something with error object
        }); 
        
        
        
        
    };
    
    $scope.doLogin = function (credentials, useWebsocket) {
        $scope.app.showLoading('Logging in');
        var username = credentials.username;
        var password = credentials.password;
       
        var req = {
            body: {
                ad: "ad.flextronics.com",
                uid: username,
                domain: "europe",
                passwd: password
           }
        };
       
        app.call("ad.adLogin", req);
    };
    $scope.doAppLogin = function (credentials) {
        window.plugins.touchid.save('credentials', JSON.stringify(credentials));
        $scope.doLogin(credentials, true);
    };
}