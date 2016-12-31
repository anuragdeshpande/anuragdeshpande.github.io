angular.module('swailMail').factory('cookie', ['$cookieStore', function ($cookieStore) {
    return {
        delete: function (name) {
            $cookieStore.remove(name);
        },
        saveData: function (name, value) {
            $cookieStore.put(name, value);
            console.log(JSON.parse(JSON.stringify(name)));
            console.log(JSON.parse(JSON.stringify(value)));
        },
        getData: function (name) {
            return $cookieStore.get(name);
        },
        createUserObject: function () {
            $cookieStore.put('userObject',{});
        },
        deleteUserObject: function()
        {
          $cookieStore.remove('userObject');
            console.log('User Data Removed');
        }
    };
}]);