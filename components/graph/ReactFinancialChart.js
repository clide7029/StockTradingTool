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
    RSITooltip
    
} from "react-financial-charts";
    
const ReactFinancialChart = ({initialData, setPriceData, rules} ) => {
    console.log("initial")
    console.log(initialData)
    console.log("tmpData")
    
    useEffect(() => {
        setPriceData(initialData);
    }, [initialData]);
    
    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => d.date
    );
    const height = 700;
    const width = 900;
    const margin = { left: 0, right: 48, top: 0, bottom: 24 };
    const ema12 = undefined;
    const elder = elderRay();
    const force = forceIndex();
    const RSI = new RSISeries();
    //console.log("TIMEPERIOD")
    //console.log(rules[0].timePeriod)
    //const windowSize = 0;
    //console.log(typeof(windowSize))
    const EMAS = [];
    const numEMA = 0;
    const movingAverageToolTipOptions = []
    const EMALineSeriesOptions = [];
    const isForce = false;//second graph
    const isElder = false;
    const isRSI = false;
    const isVolume = false;
    const secondChartHeight = 0;
    const thirdChartHeight = 0;
    const numUniqueCharts = 0;
    const calculatedData = 0;
    const i = 1;
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
                calculatedData = elder(func(initialData));
                console.log("CALCULATED DATA")
                movingAverageToolTipOptions.push({
                    yAccessor:func.accessor(),
                    type: "EMA",
                    stroke: func.stroke(),
                    windowSize: windowSize
                })
                EMAS.push(func);
                console.log(n.timePeriod)
                console.log(EMAS[0].options.windowSize)
                console.log("END")
                numEMA++;
            }
            else if(n.indicator == "Force") {
                if(isForce == true) {
                    rules.splice(rules.indexOf(n),1);
                }
                console.log("FORCE SET TRUE")
                calculatedData = force(initialData);
                isForce = true;
                numUniqueCharts++;
            }
            else if(n.indicator != "Elder") {
                let ema12 = ema()
                    .options({ windowSize: windowSize})
                    .merge((d, c) => {
                    d.ema12 = c;
                })
                .accessor((d) => d.ema12);
                let ema26 = ema()
                    .options({ windowSize: windowSize})
                    .merge((d, c) => {
                d.ema26 = c;
                })
                .accessor((d) => d.ema26);
                calculatedData = elder(ema26(ema12(initialData)));
                isElder == true;
            }
            else if(n.indicator == "RSI") {
                numUniqueCharts++;
            }
            else if(n.indicator == "Volume"){
                isVolume = true;
                numUniqueCharts++;
            }
            i++;
        } 
    );
    if(numUniqueCharts >= 1) {
        secondChartHeight = 100;
    }
    if(numUniqueCharts >= 2) {
        thirdChart = 100;
    }
    console.log("EMA, Force, Elder");
    console.log(numEMA);
    //console.log(numForce);
    //const elder = elderRay();
    //const force = forceIndex();
    //const calculatedData = elder(ema26(ema12(initialData)));
    //const calculatedData = 0;
    
    //elder(ema12(initialData));
    //calculatedData = force(initialData);
    console.log("REGULAR CHART")
    console.log(initialData)
    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialData);
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom;



    const secondChartOrigin = (_, h) => [0, h - secondChartHeight - thirdChartHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight - secondChartHeight - thirdChartHeight];
    //const barChartOrigin = (_, h) => [0, h - barChartHeight];
    const chartHeight = gridHeight - secondChartHeight - thirdChartHeight;
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
                        </Chart>
        }
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines showTickLabel={!numUniqueCharts && true} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
        <></>
        {EMAS.map((n,i) => <LineSeries key={i} yAccessor={n.accessor()} strokeStyle={n.stroke()}/>)}
        {EMAS &&
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
        />

<ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
        </Chart>
        {isForce && 
        <Chart
            id={5}
            height={secondChartHeight}
            yExtents={force.accessor()}
            origin={secondChartOrigin}
            padding={{ top: 8, bottom: 8 }}
        >
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY
            rectWidth={margin.right}
        displayFormat={pricesDisplayFormat}
        />
        <LineSeries key="" yAccessor={(d)=>d.forceIndex} fill = "FF0000"/>
        <SingleValueTooltip yAccessor={force.accessor()} yLabel="Force" origin={[8,16]}/>
        </Chart>}
        <CrossHairCursor />
    </ChartCanvas>
    );
}
const getData = async (search) => {
    const response =  await fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=1610669676&to=1644884076&token=c6im5hiad3i8jt9dugng')
    const returnData = await response.json();
    initialData = returnData;
}
export default ReactFinancialChart;

/*
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