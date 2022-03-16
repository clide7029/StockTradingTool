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
		returnData[i] = {
			date : tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDate() + " " + tmpDate.getHours() + ":" + tmpDate.getMinutes() + ":" + tmpDate.getSeconds(),
			open : fetchData.o[i],
			low : fetchData.l[i],
			high : fetchData.h[i],
			close : fetchData.c[i],
			volume : fetchData.v[i]
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
		tmpReturnData.push(returnData[j]);
		j--;
	}
	console.log(tmpReturnData)
	return tmpReturnData;
}