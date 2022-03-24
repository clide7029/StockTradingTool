import { connectToDatabase } from "../../../util/mongodb.js";
export default async ({ query: { name}}, res) => {
  const { db } = await connectToDatabase();
  const stock = await db
    .collection("stock")
    .findOne({description: name})
  res.json(stock);
};