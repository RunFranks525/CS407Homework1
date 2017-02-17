// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('QuizApplication', ['ionic'])


.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/startQuiz.html',
            controller: 'StartController'
        })
        .state('imageQuestion', {
            url: "/imageQuestion",
            templateUrl: "templates/imageQuestion.html",
            controller: 'ImageQuestionController'
        })
        .state('textQuestion', {
            url: "/textQuestion",
            params: {
                "imageResult" : null
            },
            templateUrl: "templates/textQuestion.html",
            controller: 'TextQuestionController'
        })
        .state('results', {
            url: '/results',
            params: {
                "imageResult": null,
                "textResult": null
            },
            templateUrl: "templates/results.html",
            controller: 'ResultController'
        });

    $urlRouterProvider.otherwise("/");
})
ionicApp.controller('StartController', function($scope, $state, $ionicViewSwitcher) {
    $scope.startQuiz = function () {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go("imageQuestion");
    }
})

ionicApp.controller('ImageQuestionController', function ($scope, $state, $ionicViewSwitcher) {
    $scope.imageAnswer = 0;
    var correctAnswer = 2;
    $scope.checkAndAdvanceToText = function (userAnswer) {
        var score = 0;
        if (userAnswer === correctAnswer) {
            score++;
        }
        $ionicViewSwitcher.nextDirection('forward');
        $state.go("textQuestion", {
            'imageResult' : score
        });
    }
})

ionicApp.controller('TextQuestionController', function ($scope, $state, $ionicViewSwitcher, $stateParams, $ionicLoading) {
    $scope.textAnswer = "";
    $scope.checkAndAdvanceToResults = function () {
        var score = 0;
        var userResponse = $scope.textAnswer;
        if(userResponse === "") {
              $ionicLoading.show({ template: 'Please enter a value!', noBackdrop: true, duration: 1000 });
        }else{
          if(userResponse === new Date().getFullYear()){
                    score++;
                }
                $ionicViewSwitcher.nextDirection("forward");
                $scope.textAnswer = "";
                $state.go("results", {
                    'imageResult' : $stateParams.imageResult,
                    'textResult' : score
                });
        }

    }

})

ionicApp.controller('ResultController', function ($scope, $state, $stateParams, $ionicViewSwitcher) {
    $scope.resultAmount = $stateParams.imageResult + $stateParams.textResult;
    $scope.restart = function () {
        $ionicViewSwitcher.nextDirection("back");
        $state.go("index");
    }
})



