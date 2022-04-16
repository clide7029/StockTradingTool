import { connectToDatabase } from "../../../../../util/mongodb.js";
export default async ({ query: { UID, Passw}}, res) => {
  const { db } = await connectToDatabase();
  const Users = await db
    .collection("users")
    .findOne({username: UID, password: Passw})
    if (Users) {
        return res.send({
            success: false,
            message: 'Error: Account already exist.'
          });
    } else {
        const Users2 = await db
            .collection("users")
            .insert({username: UID, password: Passw})
            res.json(Users2);
    }
};