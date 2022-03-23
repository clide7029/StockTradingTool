import { connectToDatabase } from "../../../util/mongodb.js";
export default async ({ query: { type}}, res) => {
  const { db } = await connectToDatabase();
  const stock = await db
    .collection("stock")
    .find({type: type})
    .sort()
    .toArray();
  res.json(stock);
};