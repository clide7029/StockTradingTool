

function ema(rule, priceData) {
    let signal = 0;
    if(priceData.close >= priceData[`ema${rule.timePeriod}`]){
        signal = 1;
    }else if(priceData.close < priceData[`ema${rule.timePeriod}`]){
        signal = -1;
    }else{
        signal = 0;
        }
    
    return signal;
}


export default ema