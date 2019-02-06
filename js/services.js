angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('funnelResults', function ($rootScope) {
        function trunc(n) {
            return Math[n > 0 ? "floor" : "ceil"](n);
        }

        return {
            calculate: function (data) {
                var outputFunnel = {};
                angular.copy(data, outputFunnel);
                
                outputFunnel.adCosts.value = outputFunnel.cpc.value * outputFunnel.totalClicks.value;

                outputFunnel.squeeze.leads.value = trunc(outputFunnel.totalClicks.value * (outputFunnel.squeeze.conversion.value / 100.0));
                outputFunnel.squeeze.cpl.value  = outputFunnel.adCosts.value / outputFunnel.squeeze.leads.value;

                outputFunnel.tripwire.twSales.value = trunc((outputFunnel.tripwire.conversion.value / 100.0) * outputFunnel.squeeze.leads.value);
                outputFunnel.tripwire.cptws.value = (outputFunnel.adCosts.value / outputFunnel.tripwire.twSales.value);

                outputFunnel.coreOffer.coSales.value = trunc(outputFunnel.tripwire.twSales.value * (outputFunnel.coreOffer.conversion.value / 100.0));
                outputFunnel.coreOffer.cpcos.value = outputFunnel.adCosts.value / outputFunnel.coreOffer.coSales.value;

                outputFunnel.profitMax.pmSales.value = trunc(outputFunnel.coreOffer.coSales.value * (outputFunnel.profitMax.conversion.value / 100.0));
                outputFunnel.slackAdj.saSales.value =  trunc(outputFunnel.profitMax.pmSales.value * (outputFunnel.slackAdj.conversion.value / 100.0));

                outputFunnel.revenue.value = ((outputFunnel.tripwire.twSales.value * outputFunnel.tripwire.price.value) +
                                        (outputFunnel.coreOffer.coSales.value * outputFunnel.coreOffer.price.value) +
                                        (outputFunnel.profitMax.pmSales.value * outputFunnel.profitMax.price.value) +
                                        (outputFunnel.slackAdj.saSales.value * outputFunnel.slackAdj.price.value));


                outputFunnel.profitLoss.value = outputFunnel.revenue.value - outputFunnel.adCosts.value;
                outputFunnel.epc.value = (outputFunnel.profitLoss.value / outputFunnel.adCosts.value);

                return outputFunnel;
            },

            getData: function () {
                return angular.fromJson(window.localStorage.getItem("funnelData"));
            },

            saveData: function (data) {
                window.localStorage.setItem("funnelData", angular.toJson(data));
            }
        }
    })
;
