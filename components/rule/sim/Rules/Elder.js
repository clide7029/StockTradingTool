function elder(rule, priceData){
        let signal = 0;
        if(priceData.elderRay.bullPower >= rule.buyPower || priceData.elderRay.bearPower >= -1 * rule.sellPower){
            signal = 1;
        }else if(priceData.elderRay.bearPower <= -1 * rule.sellPower || priceData.elderRay.bullPower >= rule.sellPower){
            signal = -1;
        }else{
            signal = 0;
            }
        return signal;
    }

export default elder;