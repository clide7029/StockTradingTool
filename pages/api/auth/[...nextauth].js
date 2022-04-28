import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../util/mongodb';

export default NextAuth({
  session: {
    jwt: true,
  },


  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const usersCollection = db.db().collection('users');

        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          db.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          db.close();
          throw new Error('Could not log you in!');
        }

        db.close();
        return { username: user.username };
        
      },
    }),
  ],
});
