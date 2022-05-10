function volume(rule, priceData){
        let signal = 0;
        if(priceData.open < priceData.close){
            if(priceData.volume > rule.buyVolume){
                signal = 1
            }
        }else if(priceData.open > priceData.close){
            if(priceData.volume > rule.sellVolume){
                signal = -1
            } 
        }else{
            signal = 0;
        }
        return signal;
    }

export default volume;