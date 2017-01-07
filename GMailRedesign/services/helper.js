angular.module('swailMail').factory('helper', ['$http', 'storageService', 'constants', '$q', '$state', function ($http, storage, constants, $q, $state) {
    function checkValidity() {
        var token = storage.get('access_token');
        console.log(JSON.parse(JSON.stringify('Verifying Token'+ token)));
        if(token) {
            return httpGet('/oauth2/v3/tokeninfo').then(
                function (response) {
                    return ({status: response.response.status === 200});
                }
            );
        }else{
            var deferred = $q.defer();
            deferred.resolve({status: false});
            return deferred.promise;
        }
    }

    function httpGet(url, payload) {
        var token = storage.get('access_token');
        var deferred = $q.defer();
        // console.log(JSON.parse(JSON.stringify('Getting: '+constants.base+url+'?access_token='+token)));
        $http.get(constants.base+url+'?access_token='+token ,{params: !(payload===undefined)? payload: ''}).then(function (responseObject) {
            deferred.resolve({
                response: responseObject
            });
        }, function (errorResponse) {
            deferred.resolve({
                response: errorResponse
            })
        });
        return deferred.promise;
    }

    function logout() {
        storage.removeAll();
        var newWindow = window.open('https://mail.google.com/mail/?logout&hl=fr', 'Disconnect from Google', 'width=100,height=50,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,top=200,left=200');
        setTimeout(function () {
            if (newWindow) newWindow.close();
            window.location = "#/login";
        }, 3000);
    }

    return{
        verify: checkValidity,
        httpGet: httpGet,
        logout: logout
    }
}]);