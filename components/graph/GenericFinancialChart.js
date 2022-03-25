import React from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { dataConverter } from "./utils";
import CandleStick from "./graphComponents/CandleStick";
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
  //macd,
  //MACDSeries,
  //MACDSeriesProps,
  //MACDTooltip,
  //MACDTooltipProps
} from "react-financial-charts";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "./utils"
import SuperChart from "./graphComponents/SuperChart";
import ReactFinancialChart from "./ReactFinancialChart";

//seriesType, timePeriod

//ForEma : ema12, ema26
let initialData = [{}];
const GenericFinancialChart = ({search, setPriceData, rules}) => {
  getData(search);
  const indicator = ""
  console.log("Initial Data Set")
  //const [initialData,isLoading] = useFetch(search);
  //while(isLoading) {
    //console.log("timeout");
    //setTimeout(() => {console.log("Timeout")}, 1000)
  //}
  console.log(initialData);

  console.log(rules)
  if(!rules.length == 0) {
    console.log("IN SUPER CHART RULES")
    console.log(rules)
      //return <SuperChart searchData = {initialData} rules = {rules}/>
        return <ReactFinancialChart initialData={initialData} setPriceData={setPriceData} rules={rules}/>
    }
    console.log("giving page")
    return <CandleStick initialData = {initialData}/>
}
export async function getServerSideProps(context) {
  let response = fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=1610669676&to=1644884076&token=c6im5hiad3i8jt9dugng');
  response = await response.json();
  let propsData = dataConverter(response)
  return {
    props : {propsData},
  }
}

const getData = async (search, setInitialData) => {
  try {
    const response =  await fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=1490053980&to=1644884076&token=c8qlb5qad3ienapjoalg')
    console.log(response)
    if(!response.ok) {
      throw new Error();
    }
    const returnData = await response.json();
    console.log("Success")
    initialData = dataConverter(returnData);
  }
  catch(error) {
    console.log("failed to fetch data")
    console.log(error)
    
  }
}

function useFetch(search) {
  console.log("here")
  const [fetchData, setFetchData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    console.log("herer")
    (async () => {
      console.log("Herer")
      setLoading(true);
      let response = await fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=1610669676&to=1644884076&token=c6im5hiad3i8jt9dugng');
      response = await response.json();
      let tmp = dataConverter(response);
      setFetchData(tmp);
      setLoading(false);
      console.log("Herer")
    })();
  }, []);
  return [fetchData,isLoading];
}


export default GenericFinancialChart