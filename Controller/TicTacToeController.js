/// <reference path="../Scripts/angular.min.js" />

Gamingapp.controller("TicTacToe", ['$scope', "$rootScope", "$location", "$localStorage", function ($scope, $rootScope, $location, $localStorage) {
    debugger;    
    //$rootScope.showButton = false;
    $scope.UserName = $rootScope.CurrentUser;
    $scope.AllUserName = $rootScope.UserNames;

    $scope.startGame = function () {
        $scope.GameStart = true;
        $scope.winner = null;
        $scope.currentPlayer = 'O'
        $scope.player = 'O'
        $scope.IsFilled = false;
        $scope.count = 0;
        $scope.WinUser = null;
        ///***Dashborad Start***///
        $scope.GamesPlayed = 0;
        $scope.Win = 0;
        $scope.Loss = 0;
        $scope.Tie = 0;
        //debugger;
        var data = $rootScope.UserNames.filter(function (item) {
            return item.username == $rootScope.CurrentUser
        }
        );
        if (data) {
            if (data.length >= 2) {
                outer_loop:
                    for (var i = 0; i < $rootScope.UserNames.length; i++) {
                        for (var j = 0; j < $rootScope.UserInfo.length; j++) {
                            if ($rootScope.UserNames[i].username == $rootScope.UserInfo[j].UserName) {
                                if ($rootScope.UserInfo[j].UserName == $rootScope.CurrentUser) {
                                    $rootScope.UserInfo[j].GamesPlayed = $rootScope.UserInfo[j].GamesPlayed + 1;
                                    break outer_loop;
                                }
                            }
                        }
                    }
            }
            else {
                $scope.GamesPlayed = $scope.GamesPlayed + 1;
            }
            if (data.length >= 2) {
            }
            else {
                debugger;
                if ($rootScope.UserInfo) {
                    ///***Code to restrict not to add user again if he is playing the game again & again after login.
                    var checkCurrentUser;
                    checkCurrentUser = $rootScope.UserInfo.filter(function (item) {
                        return item.UserName == $rootScope.CurrentUser;
                    });
                    if (checkCurrentUser) {
                        if (checkCurrentUser.length < 1) {

                            $rootScope.UserInfo.push({

                                UserName: $scope.UserName,
                                GamesPlayed: $scope.GamesPlayed,
                                Win: $scope.Win,
                                Loss: $scope.Loss,
                                Tie: $scope.Tie
                            });
                        }
                        else {
                            outer_loop:

                                for (var i = 0; i < $rootScope.UserInfo.length; i++) {
                                    if ($rootScope.UserInfo[i].UserName == $rootScope.CurrentUser) {
                                        $rootScope.UserInfo[i].GamesPlayed = $rootScope.UserInfo[i].GamesPlayed + 1;
                                        break outer_loop;
                                    }
                                }
                        }
                    }
                }
                else {
                    $rootScope.UserInfo = [{

                        UserName: $scope.UserName,
                        GamesPlayed: $scope.GamesPlayed,
                        Win: $scope.Win,
                        Loss: $scope.Loss,
                        Tie: $scope.Tie
                    }];
                }
            }
        }
        ///***Dashborad Ends***///

        $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
        ]

    }
    $scope.endGame = function () {
        debugger;
        $scope.GameStart = false;
        $scope.currentPlayer = 'O'
        $scope.player = 'O'
        $scope.winner = null;
        $scope.count = 0;
        //alert($scope.WinUser);
        if($scope.WinUser == null)
        {
            outer_loop:
                if ($rootScope.UserInfo) {
                    for (var j = 0; j < $rootScope.UserInfo.length; j++) {
                        if ($rootScope.UserInfo[j].UserName == $rootScope.CurrentUser) {
                            $rootScope.UserInfo[j].GamesPlayed = $rootScope.UserInfo[j].GamesPlayed - 1;
                            break outer_loop;
                        }
                    }
                }
        }
        $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
        ]

    }
    $scope.board = [
       [null, null, null],
       [null, null, null],
       [null, null, null]
    ]
    $scope.currentPlayer = 'O'
    $scope.player = 'O'
    $scope.winner = null
    $scope.IsFilled = false;


    $scope.cellText = function (row, column) {

        var value = cell(row, column)
        return value ? value : '-'
    }
    $scope.cellClick = function (row, column, index) {
        //debugger;
        if ($scope.count == 9 && $scope.winner == null) {
            for (var i = 0; i < 3; i++) {

                for (var j = 0; j < 3; j++) {
                    if (cell(i, j) == null) {
                    }
                    else {
                        alert("Game over");
                        $scope.startGame();
                        return false;
                    }
                }
            }
        }
        if ($scope.winner) {
            alert('Game over.')
            $scope.endGame();
            return
        }
        if ($scope.currentPlayer == 'O') {
            //$scope.PlayerName = 'Player 1';
            $scope.PlayerName = $rootScope.CurrentUser;
            //$scope.player = 'O';
        }
        else {
            $scope.PlayerName = 'Player 2';
            //$scope.player = 'X';
        }

        if ($scope.player != $scope.currentPlayer) {
            alert(' ' + $scope.PlayerName + ' ' + 'turn.')
            return
        }
        setCell(row, column, $scope.player)
        checkBoard()
        if ($scope.IsFilled == false) {

            $scope.currentPlayer = nextPlayer($scope.currentPlayer)
        }
        //***Code for Tie Start***//
        debugger;
        if ($scope.count == 9 && $scope.winner == null) {
            outer_loop:
                for (var j = 0; j < $rootScope.UserInfo.length; j++) {
                    if ($rootScope.UserInfo[j].UserName == $rootScope.CurrentUser) {
                        $rootScope.UserInfo[j].Tie = $rootScope.UserInfo[j].Tie + 1;
                        $scope.WinUser = 'None';
                        break outer_loop;
                    }
                }
        }
        //***Code for Tie Ends***//
    }
    // returns the value of cell
    function cell(row, column) {
        return $scope.board[row][column]
    }
    function setCell(row, column, value) {
        //debugger;
        if ($scope.board[row][column]) {
            alert("Already filled");
            $scope.IsFilled = true;
            //$scope.currentPlayer = $scope.player;
            return false;
        }
        else {
            $scope.board[row][column] = value
            $scope.IsFilled = false;
        }
    }
    // checks the board and declare winner
    function checkBoard() {
        var winner, empty = false

        // check board vertically and horizontally
        for (var i = 0; i < 3; i++) {

            if (cell(i, 0) != null && cell(i, 1) != null && cell(i, 2) != null) {

                if (cell(i, 0) == cell(i, 1) && cell(i, 1) == cell(i, 2)) {
                    winner = cell(i, 0)
                }
            }
            if (cell(0, i) != null && cell(1, i) != null && cell(2, i) != null) {
                if (cell(0, i) == cell(1, i) && cell(1, i) == cell(2, i)) {
                    winner = cell(0, i)
                }
            }
        }
        // check board diagonally
        if (cell(0, 0) != null && cell(1, 1) != null && cell(2, 2) != null) {
            if (cell(0, 0) == cell(1, 1) && cell(1, 1) == cell(2, 2)) {
                winner = cell(0, 0)
            }
        }
        if (cell(0, 2) != null && cell(1, 1) != null && cell(2, 0) != null) {
            if (cell(0, 2) == cell(1, 1) && cell(1, 1) == cell(2, 0)) {
                winner = cell(0, 0)
            }
        }

        //Code Added on 31/05/2016
        if ($scope.currentPlayer == 'O') {
            $scope.player = 'X';
        }
        else {
            $scope.player = 'O';
        }

        ///***function for calculating win,loss and tie ***///
        //debugger;
        if (winner) {
            $scope.winner = winner
            DashboardDetails()
        }
    }
    function DashboardDetails() {
        if ($scope.PlayerName == $rootScope.CurrentUser) {
            $scope.WinUser = $rootScope.CurrentUser;
            outer_loop:
                for (var j = 0; j < $rootScope.UserInfo.length; j++) {
                    if ($rootScope.UserInfo[j].UserName == $rootScope.CurrentUser) {
                        $rootScope.UserInfo[j].Win = $rootScope.UserInfo[j].Win + 1;
                        break outer_loop;
                    }
                }
        }
        else {
            $scope.WinUser = $scope.PlayerName;
            outer_loop:
                for (var j = 0; j < $rootScope.UserInfo.length; j++) {
                    if ($rootScope.UserInfo[j].UserName == $rootScope.CurrentUser) {
                        $rootScope.UserInfo[j].Loss = $rootScope.UserInfo[j].Loss + 1;
                        break outer_loop;
                    }
                }
        }
    }
    // returns the next player
    function nextPlayer(player) {

        $scope.count = $scope.count + 1;
        return {
            O: 'X',
            X: 'O'
        }
            [player]
    }
    $scope.sendValue = function () {

        //alert($location.path());
        $rootScope.val = "Value Passed";
        $location.path('/rootScopes');

    }
}
]
)
;