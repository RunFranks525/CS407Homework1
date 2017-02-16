// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('QuizApplication', ['ionic'])


.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'StartController'
        })
        .state('imageQuestion', {
            url: "/imageQuestion",
            views: {
                'imageQuestionView': {
                    templateUrl: "templates/imageQuestion.html",
                    controller: 'ImageQuestionController'
                }
            }
        })
        .state('TextQuestion', {
            url: "/textQuestion",
            params: {
                "imageResult" : null
            },
            views: {
                templateUrl: "templates/textQuestion.html",
                controller: 'TextQuestionController'
            }
        })
        .state('results', {
            url: '/results',
            params: {
                "imageResult": null,
                "textResult": null
            },
            views: {
                'resultsView': {
                    templateUrl: "templates/results.html",
                    controller: 'ResultController'
                }
            }
        });

    $urlRouterProvider.otherwise("/");
})
ionicApp.controller('StartController', function($scope, $state, $ionicViewSwitcher) {
    $scope.startQuiz = function () {
        var q = 0;
        $ionicViewSwitcher.nextDirection(q);
        $state.go("imageQuestion");
    }
})

ionicApp.controller('ImageQuestionController', function ($scope, $state, $ionicViewSwitcher) {
    $scope.imageAnswer = 0;
    var correctAnswer = 2;
    $scope.checkAndAdvanceToText = function () {
        var userResponse = $scope.imageAnswer;
        var score = 0;
        if (userResponse === correctAnswer) {
            score++;
        }
        $ionicViewSwitcher.nextDirection('forward');
        $state.go("textQuestion", {
            'imageResult' : score
        });
    }
})

ionicApp.controller('TextQuestionController', function ($scope, $ionicViewSwitcher, $stateParams) {
    $scope.textAnswer = "";
    var correctAnswer = "Something";
    $scope.checkAndAdvanceToResults = function () {
        var score = 0;
        var userResponse = $scope.textAnswer;
        if(userResponse === correctAnswer){
            score++;
        }
        $ionicViewSwitcher.nextDirection("forward");
        $state.go("results", {
            'imageResult' : $stateParams.imageResult,
            'textResult' : score
        });
    }

})

ionicApp.controller('ResultController', function ($scope, $stateParams, $ionicViewSwitcher) {
    $scope.resultAmount = $stateParams.imageResult + $stateParams.textResult;
    $scope.restart = function () {
        $ionicViewSwitcher.nextDirection("back");
        $state.go("home");
    }
})



