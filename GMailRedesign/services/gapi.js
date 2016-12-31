angular.module('swailMail').factory('googleApi', ['cookie', '$q', '$rootScope', '$http', function ($cookie, $q, $rootScope, $http) {
    var CLIENT_ID = '793225560426-to0jcpob9p2jklejgmp2iv0maumqe5to.apps.googleusercontent.com';
    var SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/userinfo.email'];


    //Main Methods
    function requestAuth(type) {
        $cookie.createUserObject();
        var deferred = $q.defer();
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': type
        }, function (authObject) {
            var result = {
                status: false,
                access_token: '',
                message: ''
            };
            if (authObject && !authObject.error) {
                $cookie.saveData('authKey', authObject.access_token);
                $cookie.saveData('authObject', authObject);

                result.status = true;
                result.access_token = authObject.access_token;
                result.message = 'Authenticated!'
            }
            else {
                result.status = false;
                result.access_token = '';
                result.message = 'Login'
            }

            $rootScope.$apply(function () {
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }


    function getProfileDetails(access_token) {
        var deferred = $q.defer();
        $http.get('https://www.googleapis.com/plus/v1/people/me/?access_token=' + access_token).then(
            function onSuccess(result) {
                deferred.resolve({
                    status: true,
                    message: 'Profile Details Fetched'
                });

                $cookie.saveData('profileDetails', result.data);

            }, function onError(errorResponse) {
                deferred.resolve({
                    status: false,
                    message: 'Error! Login Again'
                });
                // todo handle onError for getProfileDetails
                console.log(errorResponse);
            });
        return deferred.promise;
    }

    function getLabelDetails(access_token) {
        
    }



    return {
        requestAuth: requestAuth,
        setProfileDetails: getProfileDetails,
        fetchLabels: getLabelDetails
    }

}
]);