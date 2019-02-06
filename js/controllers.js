angular.module('starter.controllers', [])
    .controller('FunnelCtrl', function ($scope, funnelResults) {

        $scope.displayMoney = function displayMoney(n, currency) {
            return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        var dataLocalStorage = funnelResults.getData();
        if (dataLocalStorage != null) {
            $scope.data = dataLocalStorage;
        }
        else {
            // Initialize example data
            $scope.data = {
                adCosts: {
                    value: 1000,
                    unit: "$"
                },

                totalClicks: {
                    value: 1000,
                    unit: ""
                },

                cpc: {
                    value: 1.00,
                    unit: "$"
                },

                squeeze: {
                    conversion: {
                        value: 30,
                        unit: "%"
                    },
                    leads: {
                        value: 200,
                        unit: ""
                    },
                    cpl: {
                        value: 3.33,
                        unit: "$"
                    }
                },

                tripwire: {
                    price: {
                        value: 7,
                        unit: "$"
                    },
                    conversion: {
                        value: 7,
                        unit: "%"
                    },
                    twSales: {
                        value: 21,
                        unit: ""
                    },
                    cptws: {
                        value: 47.62,
                        unit: "$"
                    }
                },

                coreOffer: {
                    price: {
                        value: 125,
                        unit: "$"
                    },
                    conversion: {
                        value: 20,
                        unit: "%"
                    },
                    coSales: {
                        value: 4,
                        unit: ""
                    },
                    cpcos: {
                        value: 250,
                        unit: "$"
                    }
                },

                profitMax: {
                    price: {
                        value: 997,
                        unit: "$"
                    },
                    conversion: {
                        value: 20,
                        unit: "%"
                    },
                    pmSales: {
                        value: 0,
                        unit: ""
                    }
                },

                slackAdj: {
                    price: {
                        value: 0,
                        unit: "$"
                    },
                    conversion: {
                        value: 20,
                        unit: "%"
                    },
                    saSales: {
                        value: 0,
                        unit: ""
                    }
                },

                profitLoss: {
                    value: -353,
                    unit: "$"
                },

                revenue: {
                    value: 647,
                    unit: "$"
                },

                epc: {
                    value: -0.35,
                    unit: "$"
                }
            };
        }

        $scope.value_change_add = function (value_get) {
            $scope.data.cpc.value = Math.round((parseFloat(value_get) + 0.05) * 100) / 100
        }

        $scope.value_change_sub = function (value_get) {
            $scope.data.cpc.value = Math.round((parseFloat(value_get) - 0.05) * 100) / 100
        }


        $scope.change = function () {
            $scope.data = funnelResults.calculate($scope.data);
            funnelResults.saveData($scope.data);
        }

        $scope.data = funnelResults.calculate($scope.data);

        $scope.keypressHandler = function(event, nextIdx){
            if(event.keyCode == 13){
                angular.element(
                    document.querySelector('#f_'+nextIdx))[0].focus();
            }
        }
    })
    
    .controller('increase', ['$scope', function($scope) {
		$scope.counter = 0;
      	$scope.change = function() {
        	$scope.counter++;
      	};
    }]);
