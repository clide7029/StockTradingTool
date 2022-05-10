
import Rule from './Rule'

import {initialData} from '../../graph/data'

class Simulation{

    constructor(priceData, rules){
        // this.stock = stock;
        this.priceData = priceData;
        
        // console.log("PRICE DATA");
        // console.log(this.priceData)
        // this.timePeriod = timePeriod;
        // this.interval = interval;
        this.rules = rules;
        this.simRules = {}
        this.ruleData = [];
        this.risk = false;
        this.reward = false;
        // this.ruleSet = ruleSet.from({length:length(ruleSet)}, (rule)=>Rule(rule));
        this.holding = false;
        this.tradeList = [];
        this.position = null;
        this.capital = 1000;
        this.ruleProfit = 1;
        this.stockProfit = 0;
    }


    run(){

        for (let i=0; i < this.priceData.length; i++) {
            let signalList = this.onIntervalUpdate(i);
            let signalCount = 0;
            for (let j=0; j < signalList.length; j++) {
                signalCount += signalList[j];
            }
            if(signalCount == signalList.length || self.reward){
                if(this.holding == false){
                    //mark bought
                    this.priceData[i].trade = "BUY";
                    this.holding = true;
                    this.position = this.priceData[i].close;

                    //add to tradelist
                    this.tradeList.push({
                        idx: i,
                        date: `${this.priceData[i].date.getFullYear()}-${this.priceData[i].date.getMonth()+1}-${this.priceData[i].date.getDate()}-${this.priceData[i].date.getHours()}:00`,
                        trade: "BUY",
                        price: this.priceData[i].close
                    });
                }
            }else if(signalCount == -signalList.length || self.risk){
                if(this.holding == true){
                    //mark sold
                    this.priceData[i].trade = "SELL";
                    this.holding = false;

                    //calculate profit
                    let tradeProfit = 1 + ((this.priceData[i].close - this.position) / this.position);
                    this.ruleProfit *= tradeProfit;
                    this.position = null;

                    //add to tradelist
                    this.tradeList.push({
                        idx: i,
                        date: `${this.priceData[i].date.getFullYear()}-${this.priceData[i].date.getMonth()+1}-${this.priceData[i].date.getDate()}-${this.priceData[i].date.getHours()}:00`,
                        trade: "SELL",
                        price: this.priceData[i].close,
                        profit: ((tradeProfit-1)*100).toFixed(5) + "%"
                    });
                    
                }
            }
        }

        this.priceData[1].date.get

        this.ruleProfit -= 1;
        this.ruleProfit *= 100;
        this.stockProfit = (this.priceData[this.priceData.length-1].close - this.priceData[0].close) / this.priceData[0].close;
        this.stockProfit *= 100;

        this.tradeList.unshift({stockProfit:this.stockProfit.toFixed(2)+"%", ruleProfit:this.ruleProfit.toFixed(2)+"%"});
        

        return this.tradeList;

    }


    onIntervalUpdate(priceIndex){
        let ruleData = []
        self.risk, self.reward = false;

        this.rules.forEach((rule,i) => {
            if (rule.indicator == "Risk"){
                this.checkRisk(rule, priceIndex);
            }else{
                const signal = this.evaluateRule(rule, priceIndex);
                ruleData[i] = signal;
            }
        });

        return ruleData;
    }

    evaluateRule(rule, i){
        // create new rule object if there isn't one for this indicator
        if (!this.simRules[rule.indicator]){
            this.simRules[rule.indicator] = new Rule(rule);
        }
        const tradeData = this.simRules[rule.indicator].evaluate(this.priceData[i]);
        return tradeData;
    }


    checkRisk(rule, index){
        let percentChange = 100 * (this.priceData[index].close - this.position) / this.position;
        if(rule.risk != 0 && percentChange <= -rule.risk){
            self.risk = true;
        }else if(rule.reward != 0 && percentChange >= rule.reward){
            self.reward = true;
        }
    }

}

export default Simulation;
