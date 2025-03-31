const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFoundError, ServerError } = require("../errors");
const {welcomeMail} = require("../utils/Email");

const register = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    throw new BadRequest("input cannot be empty");
  }

  try {
    await welcomeMail(email);
    const user = await User.create({
      fullname,
      email,
      password,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "registration successful",
      data: user.getUserDocs(),
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("No user with this Email");
  }

  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword) {
    throw new BadRequest("invalid credentials");
  }

  await user.createCookies(res);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "login sucessfull",
    data: user.getUserDocs(),
  });
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({ success: true, msg: "logout successfull" });
};

module.exports = {
  register,
  login,
  logout,
};
