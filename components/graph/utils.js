
import { initialData } from "./data";
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
/*
const dReturn = {
	
	//absoluteChange: ""
	close: []
	date : [],
	open : [],
	high : [],
	low : [],
	close : [],
	volume : []
};
*/
const dReturn = [];
function parseData(parse) {
	return function(d) {
		//console.log(d.date)
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		//console.log(d)
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export async function getData() {
	const data = await fetch('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1641075643&to=1646605243&token=c6im5hiad3i8jt9dugng').then(response => response.json());
	console.log(data);
	var bar
	for(bar in data)
	{
		console.log(bar)
	}
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	console.log(promiseMSFT)
	var bar2
	for(bar2 in promiseMSFT)
	{
		console.log("Method" + bar2)
	}
	return promiseMSFT;
}

export async function getDataPrime() {
	const response = await fetch('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1641075643&to=1614896443&token=c6im5hiad3i8jt9dugng');
	console.log('here')
	const data = await response.json();
	//data.d.forEach(element => d.date.push(element));
	let i = 0
	console.log(data)
	console.log(data.o)
	while(i < data.o.length) {
		let tmpDate = new Date(data.t[i] * 1000)
		console.log(tmpDate)
		dReturn[i] = {
			absoluteChange : "",
			close : data.c[i],
			date : tmpDate,
			dividend : "",
			high : data.h[i],
			low : data.l[i],
			open : data.o[i],
			percentChange: "",
			split: "",
			volume : data.v[i]
		}
		console.log(dReturn[i])
		i++
	}
	dReturn['columns'] = ['date', 'open', 'high', 'low', 'close', 'volume', 'split', 'dividend', 'absoluteChange', 'percentChange'];
	console.log(dReturn['columns'])
	return dReturn;
}
export async function getDataReactFinancialChart(stockTicker) {
	const res = 'D'
	const from = '1610669676'
	const to = '1644884076'
	const token = 'c6im5hiad3i8jt9dugng'
	stockTicker = 'MSFT'
	const url = 'https://finnhub.io/api/v1/stock/candle?symbol=' + stockTicker + '&resolution=' + res + '&from=' + from + '&to=' + to + '&token=' + token;
	console.log("here")
	const response = await fetch(url);
	const fetchData = await response.json();
	console.log("here")
	console.log(fetchData)
	const returnData = [];
	let i = 0
	while(i < fetchData.c.length) {
		let tmpDate = new Date(fetchData.t[i] * 1000)
		//console.log(tmpDate)
		//returnData[i].date = tmpDate.getFullYear + "-" + tmpDate.getMonth + "-" + tmpDate.getDay + " " + tmpDate.getHours + ":" + tmpDate.getMinutes + ":" + tmpDate.getSeconds;
		//returnData[i].open = fetchData.o[i];
		//returnData[i].low = fetchData.l[i];
		//returnData[i].high = fetchData.h[i];
		//returnData[i].close = fetchData.c[i];
		//returnData[i].volume = fetchData.v[i];
		returnData[i] = {
			date : tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDate() + " " + tmpDate.getHours() + ":" + tmpDate.getMinutes() + ":" + tmpDate.getSeconds(),
			open : fetchData.o[i],
			low : fetchData.l[i],
			high : fetchData.h[i],
			close : fetchData.c[i],
			volume : fetchData.v[i]
			/*
			ema12 : [],
			ema26 : [],
			elderRay : {
				bullPower : undefined,
				bearPower : undefined
			}
			
			elderRay : {
				bullPower : undefined,
				bearPower : undefined
			}*/
		}
		i++;
	}
	console.log("Return Data : ")
	console.log(returnData)
	let j = returnData.length -1;
	console.log("Elems:" + j)
	//let k = 0;
	const tmpReturnData = [];
	while(j >= 0) {
		//console.log("PUSHING : " + returnData[j])
		
		tmpReturnData.push(returnData[j]);
		//k++;
		j--;
	}
	console.log(tmpReturnData)
	return tmpReturnData;
}