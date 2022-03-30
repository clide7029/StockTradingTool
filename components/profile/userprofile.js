import Profile from '../components/profile/profileform';
import userPstyles from '../styles/UserProfile.module.css';
import Stonks from '../pages/stonks';


function UserProfile() {
  /**
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  getSession().then((session) => {
       if (!session) {
         window.location.href = '/auth';
       } else {
         setIsLoading(false);
       }
    });
   }, []);

   if (isLoading) {
     return <p className={ProfilePage.profile}>Loading...</p>;
   }
    */ 

  async function changePasswordHandler(passwordData) {
    const response = await fetch('../../api/user/changepassword', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={userPstyles.profile}>
      <h1>User Profile</h1>
      <Profile onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
