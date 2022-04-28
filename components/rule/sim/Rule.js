


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
            case "Elder":
                stats = this.elder(priceData);
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

        // console.log("stats");
        // console.log(stats);
        return stats;
    }

    ema(priceData){
        let signal = 0;
        if(priceData.close >= priceData[`ema${this.rule.timePeriod}`]){
            // console.log("buy");
            // priceData[i].trade = "BUY";
            signal = 1;
        }else if(priceData.close < priceData[`ema${this.rule.timePeriod}`]){
            signal = -1;
        }else{
            signal = 0;
            }
        
        return signal;
    }

    elder(priceData){
        let signal = 0;
        if(this.rule.buyPower >= priceData.elderBull){
            // console.log("buy");
            // priceData[i].trade = "BUY";
            signal = 1;
        }else if(this.rule.sellPower < priceData.elderBear){
            signal = -1;
        }else{
            signal = 0;
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
    //     }else{
                // signal[i] = 0;
            // }
    //     return signal;
    // }

    volume(priceData){
        let signal = 0;
        if(priceData.open < priceData.close){
            if(priceData.volume > this.rule.buyVolume){
                signal = 1
            }
        }else if(priceData.open > priceData.close){
            if(priceData.volume > this.rule.sellVolume){
                signal = -1
            } 
        }else{
            signal = 0;
        }
        return signal;

    }
    
    rsi(priceData){
        let signal = 0;
        if(priceData.open < priceData.close){
            if(priceData.rsi > this.rule.overSold){
                signal = 1
            }
        }else if(priceData.open > priceData.close){
            if(priceData.rsi > this.rule.overBought){
                signal = -1
            } 
        }else{
            signal = 0;
        }
    
        return signal;
    }

    force(priceData){
        let signal = 0;
        if(priceData.open < priceData.close){
            if(priceData[i].forceIndex > this.rule.upForce){
                signal[i] = 1
            }
        }else if(priceData.open > priceData.close){
            if(priceData.forceIndex < -this.rule.downForce){
                signal = -1
            } 
        }else{
            signal = 0;
        }
    
        return signal;
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