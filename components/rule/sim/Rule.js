


class Rule{

    constructor(indicator, range, seriesType){
        this.indicator = indicator;
        this.rule;
        // this.ruleDir = "undefined";
        this.range = range;
        this.seriesType = seriesType;
    }

    getRule(rule){
        switch (rule){
            case "EMA":
                return (() => this.ema);
            case "MACD":
                return (() => this.macd);
            case "Force":
                return (() => this.force)
        }
        return null;
    }

    ema(priceData){
        emaSignal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].close >= priceData[i].ema){
                emaSignal[i] = 1;
            }else if(priceData[i].close < priceData[i].ema){
                emaSignal[i] = -1;
            }
        }
        return emaSignal;
    }

    macd(priceData){
        macdSignal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].close > priceData[i].macd){
                macdSignal[i] = 1
            }
        }
        return macdSignal;
    }



}

console.log("here")
var test = new Rule("SMA", "1D", 'c');
try {
    test.getRule();
} catch (error) {
    console.log(error);
}



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