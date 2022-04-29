import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { getDataReactFinancialChart } from "./utils";
import {
    elderRay,
    ema,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    ElderRaySeries,
    LineSeries,
    MovingAverageTooltip,
    OHLCTooltip,
    SingleValueTooltip,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
    ZoomButtons,
    withDeviceRatio,
    withSize,
    macd,
    MACDSeries,
    MACDSeriesProps,
    MACDTooltip,
    MACDTooltipProps,
    forceIndex,
    RSISeries,
    RSITooltip,
    LabelAnnotation,
    SvgPathAnnotation,
    Annotate,
    GenericChartComponent,
    rsi
    
} from "react-financial-charts";
//import { RSIIndicator } from "react-financial-charts/rsi";
    
const ReactFinancialChart = ({initialData, setPriceData, rules, simulating, stats} ) => {
    /*
    console.log("initial")
    console.log(initialData)
    console.log("tmpData")
    */
    useEffect(() => {
        setPriceData(initialData);
    }, [initialData]);
    useEffect(() => {
        console.log("newData: ");
        console.log(initialData);
    }, [simulating]);
    
    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => d.date
    );
    /*
    let trades = initialData.filter((n) => 
        {if(n.trades == "BUY" || n.trades == "SELL") {
            return n;
        }}    
    )
    */
    const height = 700;
    const width = 900;
    const margin = { left: 0, right: 48, top: 0, bottom: 24 };
    const elder = elderRay();
    const force = forceIndex();
    const RSI = rsi();
    const shortEMA = ema();
    const longEMA = ema();
    const signalEMA = ema();
    const EMAS = [];
    const numEMA = 0;
    const movingAverageToolTipOptions = []
    const EMALineSeriesOptions = [];
    const isForce = false;
    const isMACD = false;
    const isElder = false;
    const isRSI = false;
    const isVolume = false;
    const calculatedData = null;

    const numUniqueCharts = 0;
    const rsiData = 0;
    const rsiStrokeStyle = {};
    const i = 1;
    console.log("RULES");
    console.log(rules);
    rules.map(
        (n) => {
            if(n.indicator == "EMA") {
                const windowSize = Math.floor(n.timePeriod);
                let func = ema()
                .id(i)
                .options({windowSize: windowSize})
                .merge((d, c) => {
                    d[`ema${windowSize}`] = c;
                })
                .accessor((d) => d[`ema${windowSize}`])
                //calculatedData = elder(func(initialData));
                func(initialData);
                console.log("CALCULATED DATA")
                movingAverageToolTipOptions.push({
                    yAccessor:func.accessor(),
                    type: "EMA",
                    stroke: func.stroke(),
                    windowSize: windowSize
                })
                EMAS.push(func);
                /*
                console.log(n.timePeriod)
                console.log(EMAS[0].options.windowSize)
                console.log("END")
                */
                numEMA++;
            }
            else if(n.indicator == "MACD") {
                shortEMA = ema()
                .id(100)
                .options({windowSize : n.shortPeriod})
                .merge((d,c) => {
                    d[`MACD shortPeriod`] = c;
                })
                .accessor((d) => d[`MACD shortPeriod`]);
                longEMA = ema() 
                .id(101)
                .options({windowSize : n.longPeriod})
                .merge((d,c) => {
                    d[`ema${n.longPeriod}`] = c;
                })
                .accessor((d) => d[`ema${n.longPeriod}`]);
                signalEMA = ema() 
                .id(102)
                .options({windowSize : n.signal})
                .merge((d,c) => {
                    d[`ema${n.signal}`] = c;
                })
                .accessor((d) => d[`ema${n.signal}`]);
                shortEMA(initialData);
                longEMA(initialData);
                signalEMA(initialData);
                EMAS.push(shortEMA);
                EMAS.push(longEMA);
                EMAS.push(signalEMA);
                movingAverageToolTipOptions.push({
                    yAccessor : shortEMA.accessor(),
                    type : "EMA",
                    stroke : shortEMA.stroke(),
                    windowSize : n.shortPeriod
                })
                movingAverageToolTipOptions.push({
                    yAccessor : longEMA.accessor(),
                    type : "EMA",
                    stroke : longEMA.stroke(),
                    windowSize : n.longPeriod
                })                
                movingAverageToolTipOptions.push({
                    yAccessor : signalEMA.accessor(),
                    type : "EMA",
                    stroke : signalEMA.stroke(),
                    windowSize : n.signal
                })
            }
            else if(n.indicator == "Force") {
                if(isForce == true) {
                    rules.splice(rules.indexOf(n),1);
                }
                else {
                    calculatedData = force(initialData);
                    isForce = true;
                    numUniqueCharts++;
                }
            }
            else if(n.indicator == "Elder") {
                if(isElder == true) {
                    rules[n].remove();
                }
                else {
                let tmpema = ema()
                    .id(80)    
                    .options({ windowSize: n.ema})
                    .merge((d,c) => {
                        d[`ema${n.ema}`] = c;
                    })
                    .accessor((d) => d[`ema${n.ema}`]);
                elder(tmpema(initialData));
                isElder = true;
                numUniqueCharts++;
                }
            }
            else if(n.indicator == "RSI") {
                if(isRSI == true) {
                    rules[n].remove();

                }
                else{
                    RSI(initialData);
                    rsiStrokeStyle = {outsideThreshold : "#FF0000", insideThreshold : "#00FF00"}
                    isRSI = true;
                    numUniqueCharts++;
                }
            }
            else if(n.indicator == "Volume"){
                if(isVolume == true){
                    rules[n].remove();
                }
                else{
                    isVolume = true;
                }
            }
            i++;
        } 
    );

    const forceChartHeight = 0;
    const RSIChartHeight = 0;
    const elderRayChartHeight = 0;

    if(isForce) {
        forceChartHeight = 100;
    }
    if(isRSI) {
        RSIChartHeight = 100;
    }
    if(isElder) {
        elderRayChartHeight = 100;
    }
    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialData);
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom;
    const volumeHeight = -491 + (numUniqueCharts * 100)

    const forceChartOrigin = (_, h) => [0, h - forceChartHeight];
    const RSIChartOrigin = (_,h) => [0, h - forceChartHeight - RSIChartHeight];
    const elderRayChartOrigin = (_,h) => [0, h - forceChartHeight - RSIChartHeight - elderRayChartHeight];
    console.log("FORCE CHART HEIGHT");
    console.log(elderRayChartHeight)
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight - forceChartHeight - RSIChartHeight - elderRayChartHeight];
    //const barChartOrigin = (_, h) => [0, h - barChartHeight];
    const chartHeight = gridHeight - forceChartHeight - RSIChartHeight - elderRayChartHeight;
    //const chartHeight = gridHeight;
    const yExtents = (data) => {
    return [data.high, data.low];
    };
    const dateTimeFormat = "%d %b";
    const timeDisplayFormat = timeFormat(dateTimeFormat);

    const barChartExtents = (data) => {
    return data.volume;
    };

    const candleChartExtents = (data) => {
    return [data.high, data.low];
    };

    const yEdgeIndicator = (data) => {
    return data.close;
    };

    const volumeColor = (data) => {
    return data.close > data.open
        ? "rgba(38, 166, 154, 0.3)"
        : "rgba(239, 83, 80, 0.3)";
    };

    const volumeSeries = (data) => {
    return data.volume;
    };

    const openCloseColor = (data) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
    };

    return (
        <>
    <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
        
        {
            isVolume && <Chart 
                            id={2} 
                            height={barChartHeight}
                            origin={barChartOrigin}
                            yExtents={(d) => d.volume}
                        >
                        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
                        <SingleValueTooltip yAccessor={(d) => d.volume} yLabel="V:" origin={[255,volumeHeight]}/>
                        </Chart>
        }
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines showTickLabel={!numUniqueCharts && true} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
        <></>
        {EMAS.map((n,i) => <LineSeries key={i} yAccessor={n.accessor()} strokeStyle={n.stroke()} strokeWidth={n.id() >= 50 ? 3 : 1}/>)}
        {numEMA != 0 &&
        <CurrentCoordinate
            yAccessor={EMAS[0].accessor()}
            fillStyle={EMAS[0].stroke()}
        />}


        <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
        />
        <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
        />
        
        <MovingAverageTooltip
            origin={[8, 24]}
            options= {movingAverageToolTipOptions}
            fontSize = {8}
        />

<ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
        </Chart>
        {isForce && 
        <Chart
            id={5}
            height={100}
            yExtents={force.accessor()}
            origin={forceChartOrigin}
            padding={{ top: 8, bottom: 8 }}
        >
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat}/>
        <LineSeries key="Force" yAccessor={(d)=>d.forceIndex} fill = "FF0000"/>
        <SingleValueTooltip yAccessor={force.accessor()} yLabel="Force" origin={[8,16]}/>
        </Chart>}
        {isRSI &&
            <Chart
                id={6}
                height={100}
                yExtents={RSI.accessor()}
                origin={RSIChartOrigin}
                padding={{top:8, bottom:8}}
            >
            <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
            <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
            <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat}/>
            <RSISeries key="RSI" yAccessor={(d)=>d.rsi} strokeStyle = {rsiStrokeStyle}/>
            <SingleValueTooltip yAccessor={RSI.accessor()} yLabel="RSI" origin={[8,16]}/>
                </Chart>
        }
        {isElder &&
            <Chart
                id={7}
                height={100}
                yExtents={elder.accessor()}
                origin={elderRayChartOrigin}
                padding={{top:8, bottom:8}}
            >
            <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
            <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

            <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat}/>
        <ElderRaySeries yAccessor={elder.accessor()}/>
        <SingleValueTooltip
          yAccessor={elder.accessor()}
          yLabel="Elder Ray"
          yDisplayFormat={(d) =>
            `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
              d.bearPower
            )}`
          }
          origin={[8, 16]}
        />
                </Chart>
        }
        <CrossHairCursor />

    </ChartCanvas>
        </>
    );
}
const getData = async (search) => {
    const response =  await fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=0000000000&to=1644884076&token=c6im5hiad3i8jt9dugng')
    const returnData = await response.json();
    initialData = returnData;
}
export default ReactFinancialChart;

/*
        {simulating && trades.map((n) => <SvgPathAnnotation xAccessor = {initialData[n.idx].xAccessor()} datum = {initialData[n.idx]}/> )}

<Chart id ={4} height = {chartHeight} yExtents = {(d) =>}>
            
        </Chart>
        */
/*
        id={2}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={barChartExtents}
*/
/*       <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate
            yAccessor={ema26.accessor()}
            fillStyle={ema26.stroke()}
        />
*/



/*
<Chart
id={4}
height={elderRayHeight}
yExtents={[0, elder.accessor()]}
origin={elderRayOrigin}
padding={{ top: 8, bottom: 8 }}
>
<XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
<YAxis ticks={4} tickFormat={pricesDisplayFormat} />

<MouseCoordinateX displayFormat={timeDisplayFormat} />
<MouseCoordinateY
    rectWidth={margin.right}
    displayFormat={pricesDisplayFormat}
/>

<ElderRaySeries yAccessor={elder.accessor()} />

<SingleValueTooltip
    yAccessor={elder.accessor()}
    yLabel="Elder Ray"
    yDisplayFormat={(d) =>
    `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
        d.bearPower
    )}`
    }
    origin={[8, 16]}
/>
</Chart>
*/