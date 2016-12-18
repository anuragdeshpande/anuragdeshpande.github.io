angular.module('swailMail').factory('sharedScope', function () {
    return {
        userdata:{
            name: '',
            imgUrl: '',
            email: '',
            id_token: ''
        },
        isLoggedIn: false
    };
});