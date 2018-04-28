const router = require('express').Router()
const { User } = require('../db/models')
const crypto = require('crypto');
module.exports = router

// POST to saveresethash
router.post('/saveresethash', async (req, res) => {
  let result;

    // check and make sure the email exists
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      // If the user exists, save their password hash
      console.log('doundsuers', user)
      const timeInMs = Date.now();
      const hashString = `${req.body.email}${timeInMs}`;
      const secret = 'alongrandomstringshouldgohere';
      const hash = crypto.createHmac('sha256', secret)
      .update(hashString)
      .digest('hex');
      user.resetPasswordToken = hash;

      user.update((err) => {
        if (err){
          result = res.send(JSON.stringify({ error: '1 - Something went wrong while attempting to reset your password. Please Try again' }));
        }
        result = res.send(JSON.stringify({ success: true }));
      });
  })
  .catch((err) => {
    // if the user doesn't exist, error out
    err = res.send(JSON.stringify({ error: '2 - Something went wrong while attempting to reset your password. Please Try again' }));
    return err;
  }
)
});
