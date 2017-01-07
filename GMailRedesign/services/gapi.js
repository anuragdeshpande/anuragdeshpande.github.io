angular.module('swailMail').factory('googleApi', ['storageService', '$q', '$rootScope', 'helper', 'emailManager', function (storage, $q, $rootScope, helper, emailManager) {
    var CLIENT_ID = '793225560426-to0jcpob9p2jklejgmp2iv0maumqe5to.apps.googleusercontent.com';
    var SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/userinfo.email'];

    //Main Methods

    function requestAuth(type) {
        var result = setState('true', 'Authenticating');
        var deferred = $q.defer();
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': type
        }, function (authObject) {
            if (authObject && !authObject.error) {
                //Authentication Successful
                if (storage.set('access_token', authObject.access_token)) {
                    result = setState(true, 'Authenticated!');
                    console.log(JSON.parse(JSON.stringify('GAPI: Authenticated')));
                } else {
                    result = setState(false, 'Login');
                }
            } else {
                //Authentication Error
                result = setState(false, 'Login');
                helper.logout();
            }
            deferred.resolve(result);
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
                        id: result.response.data.id,
                        email: result.response.data.emails[0].value
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
            var responseLabels = response.response.data.labels;
            var labels = [];
            var toLoad = response.response.data.labels.length;
            var loaded = 0;

            for (var i = 0; i < responseLabels.length; i++) {
                var label = responseLabels[i];
                helper.httpGet('/gmail/v1/users/me/labels/' + label.id).then(function onSuccess(response) {
                    --toLoad;
                    labels.push({
                        name: response.response.data.name,
                        unread: response.response.data.messagesUnread,
                        id: response.response.data.id,
                        type: response.response.data.type
                    });
                    if (toLoad <= 0) {

                        var systemLabels = new Array(14);
                        var userDefinedLabels = [];
                        labels.forEach(function (label) {
                            if (label.type === 'system') {
                                switch (label.name.toLowerCase()) {
                                    case 'inbox':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 0);
                                        break;
                                    case 'sent' :
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 1);
                                        break;
                                    case 'starred' :
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 2);
                                        break;
                                    case 'important' :
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 3);
                                        break;
                                    case 'unread' :
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 4);
                                        break;
                                    case 'trash':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 5);
                                        break;
                                    case 'draft':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 6);
                                        break;
                                    case 'spam':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 7);
                                        break;
                                    case 'category_personal':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 8);
                                        break;
                                    case 'category_social':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 9);
                                        break;
                                    case 'category_promotions':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 10);
                                        break;
                                    case 'category_forums':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 11);
                                        break;
                                    case 'category_updates':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 12);
                                        break;
                                    case 'chat':
                                        (function (array, label, index) {
                                            systemLabels[index] = label;
                                        })(systemLabels, label, 13);
                                        break;

                                }
                            } else if (label.type === 'user') {
                                userDefinedLabels.push(label);
                            }
                        });


                        deferred.resolve({
                            labels: {
                                system: systemLabels,
                                user: userDefinedLabels
                            },
                            status: true
                        });
                    }
                }, function onFail(response) {
                    console.log(JSON.parse(JSON.stringify('Failed')));
                    console.log(JSON.parse(JSON.stringify(response)));
                    loaded++;
                });
            }

        });
        return deferred.promise;
    }

    function getEmails(labelID) {
        var deferred = $q.defer();
        var emails = [];
        console.log(JSON.parse(JSON.stringify('Getting Emails')));
        helper.httpGet('/gmail/v1/users/me/messages', {labelIds: labelID, maxResults: 70}).then(function (response) {
            if (response.response.status === 200) {
                var messages = response.response.data.messages;
                var messagesLength = response.response.data.messages.length;
                for (var i = 0; i < messagesLength; i++) {
                    helper.httpGet('/gmail/v1/users/me/messages/' + messages[i].id).then(function (response) {
                        var responseObject = response.response;
                        var mail = {
                            status: responseObject.status,
                            snippet: responseObject.data.snippet,
                            internalDate: responseObject.data.internalDate,
                            id: responseObject.data.id,
                            threadID: responseObject.data.threadId
                        };
                        responseObject.data.payload.headers.forEach(function (header) {
                            switch (header.name) {
                                case 'From':
                                    var from = header.value.split('<');
                                    if (from[0] === '') {
                                        mail.from = from[1].trim().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                    }
                                    else {
                                        mail.from = from[0];
                                    }

                                    break;
                                case 'To':
                                    mail.to = header.value;
                                    break;
                                case 'Reply-To':
                                    mail.replyTo = header.value;
                                    break;
                                case 'Subject':
                                    mail.subject = header.value;
                                    break;
                                case 'Delivered-To':
                                    mail.deliveredTo = header.value;
                                    break;

                            }
                        });
                        emailManager.set(mail.id, mail);
                        --messagesLength;
                        if (messagesLength <= 0) {
                            deferred.resolve({
                                mails: emailManager.getAll()
                            });
                        }
                    });
                }
            }
            else {
                deferred.resolve({
                    status: false
                });
            }
            console.log(JSON.parse(JSON.stringify('Emails Fetched')));
        });
        return deferred.promise;
    }

    function getThreads(mail) {
        var deffered = $q.defer();
        console.log(JSON.parse(JSON.stringify(mail)));
        helper.httpGet('/gmail/v1/users/me/threads/' + mail.threadID).then(function (response) {
            if (response.response.status === 200) {
                deffered.resolve({
                    status: true,
                    thread: processThreads(mail, response.response.data)
                });
            } else {
                deffered.resolve({
                    status: false
                })
            }
        });
        return deffered.promise;
    }

    function processThreads(mail, thread) {
        var participants = [];
        thread.messages.forEach(function (message) {
            message.payload.headers.forEach(function (header) {
                if (header.name === 'From') {
                    var name = header.value.split('<');
                    participants.push(name[0] ? name[0].trim().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') : name[1]);
                }
                if (header.name === 'Subject') {
                    message.subject = header.value;
                    console.log(JSON.parse(JSON.stringify(message)));
                }
            });
        });
        if (participants.length > 1 && thread.messages.length > 1) {
            thread.participants = 'Between ' + participants[0] + ' and ' + (participants.length - 1) + ' Other(s)';
        }
        else {
            thread.participants = 'By You';
        }
        thread.startDate=mail.internalDate;
        thread.subject = mail.subject;
        return thread;
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
        getLabels: getLabels,
        getEmails: getEmails,
        getThreads: getThreads
    }
}
]);