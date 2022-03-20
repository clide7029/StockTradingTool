export const dataTransformer = (data) => {
    const returnData = [];
    let i = 0
    while(i < data.c.length) {
        let tmpDate = new Date(data.t[i] * 1000)
        returnData[i] = {
			date : tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDate() + " " + tmpDate.getHours() + ":" + tmpDate.getMinutes() + ":" + tmpDate.getSeconds(),
			open : data.o[i],
			low : data.l[i],
			high : data.h[i],
			close : data.c[i],
			volume : data.v[i]
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