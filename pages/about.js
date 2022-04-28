import Meta from '../components/Meta'
const about = () => {
  return (
    <div>
      <Meta title='About' />
      <h1>About</h1>

      <h1>Price Indicators</h1>
      
      <h2>Exponential Moving Average (EMA)</h2>
      <p>A Moving Average compiles the price from a recent time period into a 
        single data point. The Exponential Moving Average differs from the Simple 
        Moving Average (SMA) by giving more weight to the nearest prices when calculating. 
        This can be very useful to quickly see how the current price compares to the recent 
        historic price average. Setting the time period high will help identify long-term 
        trends and will be slower to react to influxes in price, thus keeping a more steady
        line that often diverges from the current price. While setting the time period low 
        will mean greater movement of the average, which will tend to stay closer to the 
        current price, thus leading to more buy/sell signals. Signals to buy are triggered
        when the current price is greater then the EMA, indicating a upwards trend in price, 
        while the sell signal will be raised if the current price is lower than the EMA, 
        indicating a downtrend. 
      </p>

      <h2>Elder Ray</h2>
      <p>The Elder Ray Indicator measures the magnitude of difference between the current price
        and an EMA (usually a 13-day EMA). The Bull (BUY) Power is calculated by subtracting the
        EMA from the current high-price and shows the relative outperformance of price. The Bear
        (SELL) Power is calculated by similarly subtracting the EMA from the current low-price, 
        detailing to what degree the stock is underperforming compared to it's EMA. To use this 
        indicator effectively in trading you will need to think about the minimum magnitude of 
        over or underperformance you want a stock to have before making a trade, allowing a greater
        degree of freedom and specificity than the general binary nature of EMA to only indicate 
        whether the stock is simply over or under, not it's magnitude of difference. 
      </p>

      <h1>Momentum Indicators</h1>

      <h2>Volume</h2>
      <p>The Volume indicates how much of this stock has been exchanged (bought or sold) during
        a particular interval. The color will correlate with the candle (red for down-trending, 
        green for up-trending). Volume and price are highly correlated, in that if volume is high
        during a given interval than it is likely the difference in opening and closing price 
        is more significant than if the volume was low - for both up-trends and downtrends.
        This is why Volume is the purest indication of how much momentum a stock is currently 
        experiencing, because price tends to spike (and crash) with high volume, whenever the 
        volume is high it is usually a good indication of either a profit to be made, or a
        potential loss to be evaded. Depending on how sensitive a trader is to momentum 
        (variability risk-aversion), one can set very high or low thresholds for volume. The 
        buy / sell volume chosen is the minimum volume required to initiate a buy or sell. 
      </p>

      
      <h2>Relative Strength Index (RSI)</h2>
      <p>The RSI measures the magnitude of changes in recent time period to calcuate on a scale
        from 0 to 100 how significant the positive trends are compared to the negative trends. 
        Traditionally, a signal of 70 or greater indicates the stock may be over-bought and due 
        for a trend-reversal. Inversely, a signal of 30 or less indicates a stock may be over-sold
        and due for a reversal in the positive direction. Although these parameters can be modified
        to fit the traders needs. 
      </p>

      
      <h2>Force</h2>
      <p>The Force-Index measures takes into account both the price-change and volume to determine
        how significant a particular trend is. At each interval the difference in closing price and 
        opening price will be multiplied by the volume to produce the Force. A down-trend will have
        negative force and an uptrend will have positive force. Because this is multiplied by volume
        it will often be in the magnitude of millions to even billions for large-cap stocks. The Force
        selected will indicate the minimum force required in that direction for a buy/sell signal to trigger.  
      </p>

      <h1>Miscellaneous</h1>


      <h2>Risk / Reward</h2>
      <p>A simple % profit / loss indicator. Can be set so that once a certain desired profit has been made
        the trade will exit and sell the stock, reaping the reward before the price ticks back down. 
        Conversely, the Risk can be set so that a loss can only get so bad before selling, which will ensure
        no single trade will destroy the traders strategy. However, the typical problem with setting a sell-risk
        that is very low (say 1-2%) is that it will sell a potentially much more profitable position on a slight 
        shake of the price, which is fairly common during long up-trends. The exact numbers to set for this will 
        be highly specific to the stock and current market, and many strategies may more profitable without using 
        risk / reward especially for highly risk-averse traders. 
      </p>



    </div>
  )
}

export default about
