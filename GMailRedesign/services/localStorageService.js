angular.module('swailMail').factory('storageService', ['localStorageService', function (storage) {
    function saveData(name, value) {
        return storage.set(name, value);
    }

    function getData(name) {
        return storage.get(name);
    }

    function remove(name) {
        console.log(JSON.parse(JSON.stringify('Removed: '+ name)));
        return storage.remove(name);
    }
    function removeAll()
    {
        console.log(JSON.parse(JSON.stringify('Removing All')));
        return storage.clearAll();
    }

    return{
        saveData: saveData,
        getData: getData,
        remove: remove,
        removeAll: removeAll
    }
}]);