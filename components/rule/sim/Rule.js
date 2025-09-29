
import ema from './Rules/EMA'
import elder from './Rules/Elder'
import volume from './Rules/Volume'
import rsi from './Rules/RSI'
import force from './Rules/Force'

class Rule{

    constructor(rule){
        this.rule = rule;
    }

    evaluate(priceData){
        let stats = null;
        switch (this.rule.indicator){
            case "EMA":
                stats = ema(this.rule, priceData);
                break;
            case "Elder":
                stats = elder(this.rule, priceData);
                break;
            case "Volume":
                stats = volume(this.rule, priceData);
                break;
            case "RSI":
                stats = rsi(this.rule, priceData);
                break;
            case "Force":
                stats = force(this.rule, priceData);
                break;
        }
        return stats;
    }

}

export default Rule;











 // ema(priceData){
    //     let signal = 0;
    //     if(priceData.close >= priceData[`ema${this.rule.timePeriod}`]){
    //         signal = 1;
    //     }else if(priceData.close < priceData[`ema${this.rule.timePeriod}`]){
    //         signal = -1;
    //     }else{
    //         signal = 0;
    //         }
        
    //     return signal;
    // }

    // elder(priceData){
    //     let signal = 0;
    //     if(priceData.elderRay.bullPower >= this.rule.buyPower || priceData.elderRay.bearPower >= -1 * this.rule.sellPower){
    //         signal = 1;
    //     }else if(priceData.elderRay.bearPower <= -1 * this.rule.sellPower || priceData.elderRay.bullPower >= this.rule.sellPower){
    //         signal = -1;
    //     }else{
    //         signal = 0;
    //         }
    //     return signal;
    // }



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

    // volume(priceData){
    //     let signal = 0;
    //     if(priceData.open < priceData.close){
    //         if(priceData.volume > this.rule.buyVolume){
    //             signal = 1
    //         }
    //     }else if(priceData.open > priceData.close){
    //         if(priceData.volume > this.rule.sellVolume){
    //             signal = -1
    //         } 
    //     }else{
    //         signal = 0;
    //     }
    //     return signal;
    // }
    
    // rsi(priceData){
    //     let signal = 0;
    //     if(priceData.open < priceData.close){
    //         if(priceData.rsi > this.rule.overSold){
    //             signal = 1
    //         }
    //     }else if(priceData.open > priceData.close){
    //         if(priceData.rsi > this.rule.overBought){
    //             signal = -1
    //         } 
    //     }else{
    //         signal = 0;
    //     }
    
    //     return signal;
    // }

    // force(priceData){
    //     let signal = 0;
    //     if(priceData.open < priceData.close){
    //         if(priceData.forceIndex > this.rule.upForce){
    //             signal = 1
    //         }
    //     }else if(priceData.open > priceData.close){
    //         if(priceData.forceIndex < -this.rule.downForce){
    //             signal = -1
    //         } 
    //     }else{
    //         signal = 0;
    //     }
    
    //     return signal;
    // }