


class Rule{

    constructor(rule){
        this.rule = rule;
        // this.ruleDir = "undefined";
        // this.range = range;
        // this.seriesType = seriesType;
    }

    evaluate(priceData){
        // console.log("out");
        // console.log(priceData[1]);
        let stats = null;
        switch (this.rule.indicator){
            case "EMA":
                stats = this.ema(priceData);
                break;
            case "MACD":
                // stats = this.macd(priceData);
                break;
            case "Volume":
                stats = this.volume(priceData);
                break;
            case "RSI":
                stats = this.rsi(priceData);
                break;
            case "Force":
                stats = this.force(priceData);
                break;
        }

        console.log("stats");
        console.log(stats);
        return stats;
    }

    ema(priceData){
        let signal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].close >= priceData[i][`ema${this.rule.timePeriod}`]){
                console.log("buy");
                priceData[i].trade = "BUY";
                signal[i] = 1;
            }else if(priceData[i].close < priceData[i][`ema${this.rule.timePeriod}`]){
                signal[i] = -1;
            }
        }
        return signal;
    }

    // macd(priceData){
    //     let signal = [];
    //     for (let i = 0; i < priceData.length; i++) {
    //         if(priceData[i].close > priceData[i].macd){
    //             signal[i] = 1
    //         }else if(priceData[i].close < priceData[i].macd){
    //             signal[i] = -1;
    //         }  
    //     }
    //     return signal;
    // }

    volume(priceData){
        let signal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].open < priceData[i].close){
                if(priceData[i].volume > this.rule.buyVolume){
                    signal[i] = 1
                }
            }else if(priceData[i].open > priceData[i].close){
                if(priceData[i].volume > this.rule.sellVolume){
                    signal[i] = -1
                } 
            }
        return signal;
        }
    }
    
    rsi(priceData){
        let signal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].open < priceData[i].close){
                if(priceData[i].rsi > this.rule.overSold){
                    signal[i] = 1
                }
            }else if(priceData[i].open > priceData[i].close){
                if(priceData[i].rsi > this.rule.overBought){
                    signal[i] = -1
                } 
            }
        return signal;
        }
    }

    force(priceData){
        let signal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].open < priceData[i].close){
                if(priceData[i].force > this.rule.upForce){
                    signal[i] = 1
                }
            }else if(priceData[i].open > priceData[i].close){
                if(priceData[i].force > this.rule.downForce){
                    signal[i] = -1
                } 
            }
        return signal;
        }
    }


}

export default Rule;

// console.log("here")
// var test = new Rule("SMA", "1D", 'c');
// try {
//     test.getRule();
// } catch (error) {
//     console.log(error);
// }



 // async getRule(){
    //     let Trule;
    //     try { 
    //         Trule = await import(`./Rules/${this.indicator}.js`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     this.rule = new Trule(this.indicator, this.range, this.seriesType);
    //     console.log(this.rule.getRuleData);
    //     console.log("finished")
    // }