angular.module('swailMail').factory('cookie', ['$cookieStore', function ($cookieStore) {
    var userData =
        {name:'', image:'', emailID:'', isLoggedIn: false};
    var labels = [];

    return {
        setUserDetails: function (data) {
            userData.name = data.name||userData.name;
            userData.image = data.image||userData.image;
            userData.emailID = data.emailID||userData.emailID;
            userData.isLoggedIn = data.isLoggedIn||userData.isLoggedIn;


            $cookieStore.put('userDetails', userData);
            console.log('User Data is set');
            console.log(userData);
        },
        getUserDetails: function () {
            return userData;
        },
        delete: function (name) {

            if(name==='userDetails') {
                userData = {};
                $cookieStore.remove('userDetails');
            }
            else
            {
                $cookieStore.remove(name);
            }
        },
        saveLabels: function (recievedLabels) {
            labels = recievedLabels;
        },
        getLabels: function () {
            return labels;
        }

    };
}]);