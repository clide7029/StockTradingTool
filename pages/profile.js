import { getSession } from 'next-auth/client';

import UserProfile from '../components/profile/userprofile';
import ProfileForm from '..components/profile/profileform';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
