function rsi(rule, priceData){
        let signal = 0;
        if(priceData.open < priceData.close){
            if(priceData.rsi > rule.overSold){
                signal = 1
            }
        }else if(priceData.open > priceData.close){
            if(priceData.rsi > rule.overBought){
                signal = -1
            } 
        }else{
            signal = 0;
        }
    
        return signal;
    }

export default rsi;