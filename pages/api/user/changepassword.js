import { getSession } from 'next-auth/client';

import { hashPassword, verifyPassword } from '../../lib/auth';
import { connectToDatabase } from '../../../lib/mongodb';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userName = session.user.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const { db } = await connectToDatabase();

  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ username: userName });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    //client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { username: userName },
    { $set: { password: hashedPassword } }
  );

  //client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
