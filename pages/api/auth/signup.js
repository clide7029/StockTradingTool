import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../util/mongodb';
//import { db } from '/util/mongodb';


async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { username, password } = data;

  if (
    !username ||
    !password ||
    password.trim().length < 0
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 1 characters long.',
    });
    return;
  }
  async function getServerSideProps() {
   //const client = await connectToDatabase();
   const { db } = await connectToDatabase();
   //const db = client.db();
 
   const existingUser = await db.collection('users').findOne({ username: username });
 
   if (existingUser) {
     res.status(422).json({ message: 'User exists already!' });
     
     return;
   }
 
   const hashedPassword = await hashPassword(password);
 
   const result = await db.collection('users').insertOne({
     username: username,
     password: hashedPassword,
   });
 
   res.status(201).json({ message: 'Created user!' });
  

  }

}

export default handler;
