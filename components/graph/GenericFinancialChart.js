import React from "react";
import { dataConverter } from "./utils";
import CandleStick from "./graphComponents/CandleStick";

import ReactFinancialChart from "./ReactFinancialChart";

//seriesType, timePeriod
let initialData = [{}]

  const GenericFinancialChart = ({search, setPriceData, rules, simulating, stats}) => {
    getData(search);
  const indicator = "";

  if(!rules.length == 0) {

        return <ReactFinancialChart initialData={initialData} setPriceData={setPriceData} rules={rules} simulating={simulating} stats={stats}/>
    }

    return <CandleStick initialData = {initialData}/>
}
export async function getServerSideProps(context) {
  let response = fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=1500669676&to=1644884076&token=c6im5hiad3i8jt9dugng');
  response = await response.json();
  let propsData = dataConverter(response)
  return {
    props : {propsData},
  }
}

const getData = async (search, setInitialData) => {
  try {
    const currDate = new Date();
    const response =  await fetch('https://finnhub.io/api/v1/stock/candle?symbol=' + search.stock + '&resolution=' + search.interval + '&from=1410669676&to=' + currDate.getTime() + '&token=c8qlb5qad3ienapjoalg')

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

export default GenericFinancialChart