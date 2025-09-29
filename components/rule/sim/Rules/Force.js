function force(rule, priceData){
        let signal = 0;
        if(priceData.open < priceData.close){
            if(priceData.forceIndex > rule.upForce){
                signal = 1
            }
        }else if(priceData.open > priceData.close){
            if(priceData.forceIndex < -rule.downForce){
                signal = -1
            } 
        }else{
            signal = 0;
        }
    
        return signal;
    }

export default force;