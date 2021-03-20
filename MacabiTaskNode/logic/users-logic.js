const usersDao = require("../dao/users-dao");
const ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

/**
 * Adds a new user if it passes all of the validators
 * @param {object} userDetails - contains new user details
 */
async function addUser(userDetails) {
  if (
    await usersDao.isUsernameAlreadyExists(userDetails.username)
  ) {
    throw new ServerError(ErrorType.USERNAME_ALREADY_EXIST);
  }
  if (
    await usersDao.isEmailAlreadyTaken(userDetails.email)
  ) {
    throw new ServerError(ErrorType.EMAIL_ALREADY_TAKEN);
  }

  await validateUserDetails(userDetails);
  await usersDao.addUser(userDetails);
}

async function getAllUsers() {
  let users = await usersDao.getAllUsers();

  return users;
}

/**
 * Handles the validation of the user details
 * @param {object} userDetails - contains new user details
 */
async function validateUserDetails(userDetails) {
  if (!await isUsernameValid(userDetails.username)) {
    throw new ServerError(ErrorType.INVALID_USERNAME);
  }
  if (!await isEmailValid(userDetails.email)) {
    throw new ServerError(ErrorType.INVALID_EMAIL);
  }
  if (!await isAgeValid(userDetails.age)) {
    throw new ServerError(ErrorType.INVALID_AGE);
  }
}

async function isAgeValid(age) {
  if (age < 1) {
    return false;
  }
  if (age > 127) {
    return false;
  }

  return true;
}

async function isUsernameValid(username) {
  if (!username) {
    return false;
  }

  let username_length = username.trim().length;
  let doesUsernameContainNumbers = /\d/.test(username);

  if (username_length < 2 || doesUsernameContainNumbers || username_length > 45) {
    return false;
  }

  return true;
}

async function isEmailValid(email) {
  if (!email) {
    return false;
  }

  let email_length = email.trim().length;
  let email_pattern = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

  if (!email_pattern.test(email) || email_length > 45) {
    return false;
  }

  return true;
}

module.exports = {
  addUser,
  getAllUsers,
};
