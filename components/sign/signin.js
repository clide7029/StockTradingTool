import User from '../../user/Users';
module.exports = () => {
  /*
   * Sign up / Sign In
   */
  fetch('../pages/login', (req, res) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      username
    } = body;
    
    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }    //username = username.toLowerCase();
    //username = username.trim();    // Steps:
    // 1. Verify username doesn't exist
    // 2. Save
    User.find({
      username: username
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }      // Save the new user
      const newUser = new User();      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, newUser) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });  }); // end of sign up endpoint
    const UserSession = fetch('../../user/UserSession');
};



