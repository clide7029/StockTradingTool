const { MongoClient, ServerApiVersion, ReturnDocument } = require('mongodb');
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
const uri = "mongodb+srv://J_scar:LbhnZFusqfoAyMoH@cluster0.kcrdt.mongodb.net/cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
api_key.apiKey = "c84b3jqad3ide9hei860"
const finnhubClient = new finnhub.DefaultApi()
const input = 'BLUEACACIA LTD - CLASS A'

//test()
async function test(){
    try {
        let Data6 = await DataPriceSpan("INTL BUSINESS MACHINES CORP", "D", '02/13/2019 23:31:30', '02/13/2020 23:31:30')
        console.log(Data6)
        let Data2 = await DataPrice(input)
        console.log(Data2)
        let Data3 = await DataStock(input)
        //console.log(Data3)
        let Data4 = await DataType("ADR")
        //console.log(Data4)
        let Data5 = await UserData("001", "Pass")
        //console.log(Data5)
        
    } finally {
        //Ensures that the client will close when you finish/error
        await client.close();
        }

}

async function DataPrice(name) {
    await client.connect();
    const database = client.db('stockData');
    const stock = database.collection('stock');
    const query = {description: name};
    const test = await stock.findOne(query, { projection: { _id: 0, symbol: 1 } });
    //console.log(test.symbol);
    var ret = 0;
    finnhubClient.quote(test.symbol, (error, data, response) => {
        //console.log(data)
        database.collection('price').insertOne(data);
    });
    return await database.collection('price').findOneAndDelete({}, {sort: { _id:-1} });
}

async function DataPriceSpan(name, span, T1, T2) {
    await client.connect();
    const database = client.db('stockData');
    const stock = database.collection('stock');
    const query = {description: name};
    const test = await stock.findOne(query, { projection: { _id: 0, symbol: 1 } });
    var datum = Date.parse(T1);
    var UNIXDate = datum/1000;
    var datum2 = Date.parse(T2);
    var UNIXDate2 = datum/1000;
    finnhubClient.stockCandles(test.symbol, span, UNIXDate, UNIXDate2, (error, data, response) => {
        //console.log(data)
        database.collection('price').insertOne(data);
    });
    return await database.collection('price').findOneAndDelete({}, {sort: { _id:-1} });
}

async function DataStock(name) {
    
    await client.connect();
    const database = client.db('stockData');
    const stock = database.collection('stock');
    const query = {description: name};
    const test = await stock.findOne(query);
    //console.log(test);
    return test;
}

async function UserData(UID, Password) {
    await client.connect();
    const database = client.db('stockData');
    const stock = database.collection('User');
    const query = {UID: UID, Password: Password};
    const test = await stock.findOne(query);
    //console.log(test);
    return test;

}

async function DataType(type) {
    
    await client.connect();
    const database = client.db('stockData');
    const stock = database.collection('stock');
    const query = {type: type};
    const test = await stock.find(query).toArray();
    //console.log(test);
    return test;
}