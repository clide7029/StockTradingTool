import { connectToDatabase } from "../../../../../util/mongodb.js";
export default async ({ query: { UID, Passw}}, res) => {
  const { db } = await connectToDatabase();
  const Users = await db
    .collection("User")
    .findOne({UID: UID, Password: Passw})
    if (Users) {
        return res.send({
            success: false,
            message: 'Error: Account already exist.'
          });
    } else {
        const Users2 = await db
            .collection("User")
            .insert({UID: UID, Password: Passw})
            res.json(Users2);
    }
};