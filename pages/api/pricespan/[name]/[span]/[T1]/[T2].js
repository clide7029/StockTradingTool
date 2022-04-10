import { connectToDatabase } from "../../../../../../util/mongodb.js";
import fetch from 'node-fetch';
import {dataTransformer} from "./utils.mjs";
export default async ({ query: { name, span, T1, T2}}, res) => {
    const { db } = await connectToDatabase();
    const stock = await db
        .collection("stock")
        .findOne({description: name})
    //var datum = Date.parse(T1);
    //var UNIXDate = datum/1000;
    //var datum2 = Date.parse(T2);
    //var UNIXDate2 = datum2/1000;
    var url = 'https://finnhub.io/api/v1/stock/candle?symbol='+stock.symbol+'&resolution='+span+'&from='+T1+'&to='+T2+'&token=c84b3jqad3ide9hei860';
    const response = await fetch(url);
	const fetchData = await response.json();
    const price = await db
        .collection("price")
        .insert(fetchData)
    res.json(dataTransformer(fetchData));
};