const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');
const { Error } = require('mongoose');


exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });


exports.register = async (username, email, password, confirmPassword) => {

  if (password !== confirmPassword) {
    throw new Error('Password missmatch!');
  }

  // TODO: check if user or email exist
  const existingUser = await User.findOne({
    $or: [
      { email },
      { username }
    ]
  });

  if (existingUser) {
    throw new Error('Username exists!');
  }
  if(password.length < 4){
    throw new Error('Password must be minimum 4 characters long!');
  }

  const hashedPass = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPass });

  return this.login(email, password);
};


exports.login = async (email, password) => {
  // User exsists
  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password!');
  }
  //  Password is valid
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password!');
  }
  //  Generate token
  const payload = {
    _id: user._id,
    email,
    usernam: user.username
  }
  const token = await jwt.sign(payload, SECRET);
  return token
};