const dataTransformer = (data) => {
    const returnData = [];
    let i = 0
    while(i < data.c.length) {
        let tmpDate = new Date(data.t[i] * 1000)
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
    const tmpReturnData = [];
    let j = returnData.length -1;
    while(j >= 0) {
        tmpReturnData.push(returnData[j]);
        j--;
    }
    return tmpReturnData;
} 
export default dataTransformer;