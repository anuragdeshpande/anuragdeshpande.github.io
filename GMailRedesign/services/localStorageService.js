angular.module('swailMail').factory('storageService', ['localStorageService', '$q', function (storage, $q) {
    function saveData(name, value) {
        console.log(JSON.parse(JSON.stringify('Saving: ' + name)));
        return storage.set(name, value);
    }

    function getData(name) {
        return storage.get(name);
    }

    function remove(name) {
        console.log(JSON.parse(JSON.stringify('Removed: ' + name)));
        return storage.remove(name);
    }

    function removeAll() {
        console.log(JSON.parse(JSON.stringify('Removing All')));
        return storage.clearAll();
    }

    return {
        set: saveData,
        get: getData,
        remove: remove,
        removeAll: removeAll
    }
}]);