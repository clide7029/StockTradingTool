
import Rule from './Rule'

class Simulation{

    constructor(stock, priceData, timePeriod, interval, rules, risk){
        this.stock = stock;
        this.priceData = priceData;
        this.timePeriod = timePeriod;
        this.interval = interval;
        this.rules = rules;
        this.ruleData = [];
        this.risk = risk;
        // this.ruleSet = ruleSet.from({length:length(ruleSet)}, (rule)=>Rule(rule));
        this.holding = false;
    }


    run(){

        // for (let i = 0; i < rules.length; i++) {
        //     evaluateRule();
        // };
        this.rules.forEach((rule,i) => {
            this.ruleData[i] = this.evaluateRule(rule);
        });


        for (let i = 0; i < priceSet.length; i++) {
            
        }

    }

    evaluateRule(rule){
        var newRule = new Rule()
    }

    onIntervalUpdate(candle, index){
        rules.forEach(Rule => {
            if(Rule.evaluate(candle, index) == "BUY"){
                return 
            }
        });
    }


    checkRisk(index){
        percentChange = (this.priceSet[index] - this.positionPrice) / this.positionPrice
        
        if(percentChange <= this.risk){
            return "SELL"
        }
    }

}