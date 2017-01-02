angular.module('swailMail').factory('googleApi', ['storageService', '$q', '$rootScope', 'helper', function (storage, $q, $rootScope, helper) {
    var CLIENT_ID = '793225560426-to0jcpob9p2jklejgmp2iv0maumqe5to.apps.googleusercontent.com';
    var SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/userinfo.email'];

    //Main Methods

    function requestAuth(type) {
        var deferred = $q.defer();
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': type
        }, function (authObject) {
            if (authObject && !authObject.error) {
                //Authentication Successful
                if (storage.saveData('access_token', authObject.access_token)) {
                    //Storing data successful
                    setState(true, 'Authenticated!');
                } else {
                    //Storing auth object failed
                    console.log(JSON.parse(JSON.stringify('Storing Data Failed')));
                }
            } else {
                //Authentication Error
                setState(false, 'Login');
            }


            //Starting digest cycle
            $rootScope.$apply(function () {
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }


    function getProfileDetails() {
        var deferred = $q.defer();
        helper.httpGet('/plus/v1/people/me/').then(
            function onSuccess(result) {
                deferred.resolve({
                    status: result.response.status === 200,
                    profile: {
                        name: result.response.data.displayName,
                        image: result.response.data.image.url,
                        id: result.response.data.id
                    }
                });
            }, function onError(errorResponse) {
                deferred.resolve({
                    status: false
                });
                // todo handle onError for getProfileDetails
                console.log(errorResponse);
            });
        return deferred.promise;
    }

    function getLabels() {
        var deferred = $q.defer();
        helper.httpGet('/gmail/v1/users/me/labels').then(function (response) {

            deferred.resolve({
                status: response.response.status === 200,
                labels: response.response.data.labels
            });
        });
        return deferred.promise;
    }

    function getLabelUnread(label)
    {
        
    }

    function setState(state, message) {
        return result = {
            status: state,
            message: message
        };
    }

    return {
        requestAuth: requestAuth,
        getProfileDetails: getProfileDetails,
        getLabels: getLabels
    }

}
]);