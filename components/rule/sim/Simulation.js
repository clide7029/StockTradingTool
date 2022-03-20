
import Rule from './Rule'

import {initialData} from '../../graph/data'

class Simulation{

    constructor(priceData, rules, risk){
        // this.stock = stock;
        this.priceData = priceData;
        
        console.log("PRICE DATA");
        console.log(this.priceData)
        // this.timePeriod = timePeriod;
        // this.interval = interval;
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
            const signal = this.evaluateRule(rule);
            this.ruleData[i] = signal;
        });

        for (let i=0; i < this.ruleData.length; i++) {
            let signalCount = 0;
            for (let j=0; j < this.priceData.length; j++) {
                // const indicator = this.rules[j].indicator;
                signalCount += this.ruleData[i][j];
            }
            console.log("signalCount");
            console.log(signalCount);
            if(signalCount == this.rules.length-1){
                if(this.holding == false){
                    this.priceData[i].trade = "BUY";
                }
            }else if(signalCount == 1-this.rules.length){
                if(this.holding == true){
                    this.priceData[i].trade = "SELL";
                }
            }
        }

        console.log(this.ruleData);

        return this.priceData;

    }

    evaluateRule(rule){
        var newRule = new Rule(rule);
        const tradeData = newRule.evaluate(this.priceData);
        return tradeData;
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

export default Simulation;




// let data = []
//         for (let i = 0; i < initialData.length; i++) {
//             data[i] = initialData[i];
//             if(i>2){
//                 let avg = (initialData[i].close + initialData[i-1].close + initialData[i-2].close) / 3;
//                 data[i].ema = avg;
//             }
//         }
//         this.priceData = data;