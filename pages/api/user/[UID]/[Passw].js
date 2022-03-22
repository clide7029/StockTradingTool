import { connectToDatabase } from "../../../../util/mongodb.js";
export default async ({ query: { UID, Passw}}, res) => {
  const { db } = await connectToDatabase();
  const Users = await db
    .collection("User")
    .findOne({UID: UID, Password: Passw})
    
  res.json(Users);
};