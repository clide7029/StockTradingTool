import Profile from '../../components/profile/profileform';
import userStyles from '../../styles/UserProfile.module.css';



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
    <section className={userStyles.profile}>
      <h1>Profile Page</h1>
      <Profile onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
