angular.module('stockassistant.controllers', [])
    .controller('DashCtrl', function($scope) {})
    .controller('ChatsCtrl', function ($scope, $http, $sce, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //controller进入的时候更新数据
        $scope.$on('$ionicView.enter', function (e) {
            //alert("ChatsCtrl进入");
            $http.get('/api/Stock/GetWelcomeInfo').success(function (response) {
                $scope.html = $sce.trustAsHtml(response);
            });
        });

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })
    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
    .controller('DynamicSliderController', function($scope, $interval, $ionicSlideBoxDelegate, $timeout) {

        var slideCounter = 3;
        var validator = true;
        $scope.oldIndex = 1;

        $scope.data = {};
        $scope.data.slides = [
            {
                title: "Slide 1",
                data: "Slide 1 Content",
                active: true
            },
            {
                title: "Slide 2",
                data: "Slide 2 Content",
                active: true
            },
            {
                title: "Slide 3",
                data: "Slide 3 Content",
                active: true
            }
        ];

        $scope.slideChanged = function(newIndex) {
            var oldIndex = $scope.oldIndex;
            $scope.oldIndex = newIndex;

            if (!validator) {
                validator = true;
                return;
            }
            validator = false;

            console.log("oldIndex = " + $scope.oldIndex);
            console.log("newIndex = " + newIndex);

            var updateFunc;

            if (newIndex >= oldIndex) {
                console.log('Adding a slide');
                updateFunc = function() {
                    slideCounter++;
                    $scope.data.slides.splice(0, 1);
                    $scope.data.slides.push({
                        title: "Slide " + slideCounter,
                        data: "Slide " + slideCounter + ' Content',
                    });
                };
            } else {
                console.log('Removinvg a slide');
                updateFunc = function() {
                    slideCounter--;
                    $scope.data.slides.pop();
                    $scope.data.slides.unshift({
                        title: "Slide " + (slideCounter - 2),
                        data: "Slide " + (slideCounter - 2) + ' Content',
                    });
                };

            }

            $timeout(function() {
                updateFunc();
                $ionicSlideBoxDelegate.update();
            }, 50).then(function() {
                $ionicSlideBoxDelegate.slide(1);
            });

        }
    });
