angular.module('swailMail').factory('emailManager', ['cookie', 'googleApi', function ($cookie, $googleApi) {

    return {
        isTokenValid: function () {
            if($cookie.getUserObject())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}]);