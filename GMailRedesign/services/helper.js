angular.module('swailMail').factory('helper', ['$http', 'storageService', 'constants', '$q', function ($http, storage, constants, $q) {
    var token = storage.getData('access_token');

    function checkValidity() {
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

    function httpGet(url) {
        var deferred = $q.defer();
        console.log(JSON.parse(JSON.stringify('Getting: '+constants.base+url+'?access_token='+token)));
        $http.get(constants.base+url+'?access_token='+token).then(function (responseObject) {
            deferred.resolve({
                response: responseObject
            });
        });
        return deferred.promise;
    }


    return{
        verify: checkValidity,
        httpGet: httpGet
    }
}]);