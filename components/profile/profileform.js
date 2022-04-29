import { useRef } from 'react';

import profilesFstyles from '../styles/ProfileForm.module.css';


function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    
    
    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    });
  }



  return (
    <form className={profilesFstyles.form} onSubmit={submitHandler}>
      <div className={profilesFstyles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={profilesFstyles.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={profilesFstyles.action}>
        <button>Change Password</button>
      </div>
      <div className={profilesFstyles.control}> 
      <label>Stocks Simulation Comparsion</label> 
      </div>
      <div className={profilesFstyles.control}>
       

       </div>

      
    
     </form>
    
  );
}

export default ProfileForm;

