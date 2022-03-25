
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
        this.tradeList = [];
        this.position = null;
        this.capital = 1000;
        this.ruleProfit = 1;
        this.stockProfit = 0;
    }


    run(){

        // for (let i = 0; i < rules.length; i++) {
        //     evaluateRule();
        // };

        this.rules.forEach((rule,i) => {
            const signal = this.evaluateRule(rule);
            this.ruleData[i] = signal;
        });

        console.log("ruleData");
        console.log(this.ruleData);

        for (let i=0; i < this.priceData.length; i++) {
            let signalCount = 0;
            for (let j=0; j < this.ruleData.length; j++) {
                // const indicator = this.rules[j].indicator;
                // console.log(`i = ${i} j = ${j}`);
                // console.log(`rule data type = ${typeof(this.ruleData[i])}`)
                // console.log(`dataPoint ${j} has signal ${this.ruleData[i][j]}`)
                signalCount += this.ruleData[j][i];
            }
            if(signalCount == this.rules.length){
                if(this.holding == false){
                    this.priceData[i].trade = "BUY";
                    this.holding = true;
                    this.position = this.priceData[i].close;
                    this.tradeList.push({
                        idx: i,
                        trade: "BUY",
                        price: this.priceData[i].close
                    });
                }
            }else if(signalCount == -this.rules.length){
                if(this.holding == true){
                    this.priceData[i].trade = "SELL";
                    this.holding = false;
                    let tradeProfit = 1 + ((this.priceData[i].close - this.position) / this.position);
                    this.ruleProfit *= tradeProfit;
                    this.position = null;
                    this.tradeList.push({
                        idx: i,
                        trade: "SELL",
                        price: this.priceData[i].close,
                        profit: ((tradeProfit-1)*100).toFixed(5) + "%"
                    });
                    
                }
            }
        }
        this.ruleProfit -= 1;
        this.ruleProfit *= 100;
        this.stockProfit = (this.priceData[this.priceData.length-1].close - this.priceData[0].close) / this.priceData[0].close;
        this.stockProfit *= 100;
        console.log("tradeList");
        console.log(this.tradeList);

        console.log("ruleProfit");
        console.log(this.ruleProfit);
        console.log("stockProfit");
        console.log(this.stockProfit);

        this.tradeList.unshift({stockProfit:this.stockProfit.toFixed(2)+"%", ruleProfit:this.ruleProfit.toFixed(2)+"%"});
        

        return this.tradeList;

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