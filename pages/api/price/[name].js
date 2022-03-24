import { connectToDatabase } from "../../../util/mongodb.js";
import fetch from 'node-fetch';
export default async ({ query: { name}}, res) => {
    const { db } = await connectToDatabase();
    const stock = await db
        .collection("stock")
        .findOne({description: name})
    var url = 'https://finnhub.io/api/v1/quote?symbol='+ stock.symbol +'&token=c84b3jqad3ide9hei860';
    const response = await fetch(url);
	const fetchData = await response.json();
    res.json(fetchData);
};