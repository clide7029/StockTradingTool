import { connectToDatabase } from "../../../../util/mongodb.js";
export default async ({ query: { UID, Passw}}, res) => {
  const { db } = await connectToDatabase();
  const Users = await db
    .collection("users")
    .findOne({username: UID, password: Passw})
    
  res.json(Users);
};