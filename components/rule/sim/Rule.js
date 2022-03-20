


class Rule{

    constructor(rule){
        this.rule = rule;
        // this.ruleDir = "undefined";
        // this.range = range;
        // this.seriesType = seriesType;
    }

    evaluate(priceData){
        console.log("out");
        console.log(priceData[1]);
        let stats = null;
        switch (this.rule.indicator){
            case "EMA":
                stats = this.ema(priceData);
            case "MACD":
                console.log("why inside macd?")
                stats = this.macd(priceData);
            // case "Force":
            //     stats = this.force(priceData);
        }

        console.log("stats");
        console.log(stats);
        return stats;
    }

    ema(priceData){
        let emaSignal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].close >= priceData[i].ema){
                console.log("buy");
                priceData[i].trade = "BUY";
                emaSignal[i] = 1;
            }else if(priceData[i].close < priceData[i].ema){
                emaSignal[i] = -1;
            }
        }
        return emaSignal;
    }

    macd(priceData){
        let macdSignal = [];
        for (let i = 0; i < priceData.length; i++) {
            if(priceData[i].close > priceData[i].macd){
                macdSignal[i] = 1
            }  
        }
        return macdSignal;
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