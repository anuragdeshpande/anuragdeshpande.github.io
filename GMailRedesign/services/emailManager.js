angular.module('swailMail').factory('emailManager', [function () {

    var emails = {};

    function set(id, mail) {
        emails[id] = mail;
    }

    function get(id) {
        if (id in emails) {
            return emails[id];
        }
        else {
            return false;
        }
    }
    function getAll() {
        return $.map(emails, function (value, index) {
            return [value];
        });
    }

    return{
        set:set,
        get:get,
        getAll: getAll
    }
}]);