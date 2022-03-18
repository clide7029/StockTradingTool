import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    //elderRay,
    //ema,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    //ElderRaySeries,
    LineSeries,
    //MovingAverageTooltip,
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
    //macd,
    //MACDSeries,
    //MACDSeriesProps,
    //MACDTooltip,
    //MACDTooltipProps
  } from "react-financial-charts";
const CandleStick = ({initialData}) => {
    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date)
    );
    const height = 700;
    const width = 900;
    const margin = { left: 0, right: 48, top: 0, bottom: 24 };

    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialData);
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom;
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight];
    const chartHeight = gridHeight;
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
        <Chart
        id={2}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={barChartExtents}
        >
        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines showTickLabel={false} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
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

        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <CrossHairCursor />
    </ChartCanvas>
    );
}
export default CandleStick