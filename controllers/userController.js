const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { email, password, firstname, lastname, skintype } = req.body;

    if (!email || !password || !firstname || !lastname) {
      throw new Error('KEY Error!');
    }

    await userService.signUp(email, password, firstname, lastname, skintype);

    return res.status(201).send({ message: 'SIGNUP_SUCCESS' });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('KEY Error!');
    }
    const result = await userService.signIn(email, password);

    return res.status(200).json({ accessToken: result });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};
const getUser = async (req, res) => {
  const { userId } = req.params;

  const result = await userService.userInfo(userId);

  return res.status(200).json({ data: result });
};

module.exports = {
  signUp,
  signIn,
  getUser,
};
