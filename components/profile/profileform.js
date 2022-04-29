import { useRef } from 'react';

import profileStyles from '../styles/ProfileForm.module.css';


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
    <form className={profileStyles.form} onSubmit={submitHandler}>
      <div className={profilesFstyles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={profileStyles.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
     </form>
    
  );
}

export default ProfileForm;

