const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

/**
 * Adds a new user to the database
 * @param {0bject} userDetails - An Ojbect containing the details of the user 
 */
async function addUser({ username, email, age }) {
  let sql =
    "INSERT INTO users (username, email, age) values(?, ?, ?)";
  let parameters = [username, email, age];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Gets all of the existing users from the database
 * @returns an Array of users
 */
async function getAllUsers() {
  let sql = "SELECT username, email, age FROM users";

  try {
    let getAllUsersResult;
    getAllUsersResult = await connection.execute(sql);

    return getAllUsersResult;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Returns a boolean value whether a user already exists with the same email
 * @param {string} email - The provided email from the client
 */
async function isEmailAlreadyTaken(email) {
  let sql = "SELECT id FROM users WHERE email = ?";
  let parameters = [email];

  try {
    let isEmailFoundData;
    isEmailFoundData = await connection.executeWithParameters(sql, parameters);

    if (isEmailFoundData == null || isEmailFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns a boolean value whether a user already exists with the same username
 * @param {string} username - The provided username from the client
 */
async function isUsernameAlreadyExists(username) {
  let sql = "SELECT id FROM users WHERE username = ?";
  let parameters = [username];

  try {
    let isUsernameFoundData;
    isUsernameFoundData = await connection.executeWithParameters(
      sql,
      parameters
    );

    if (isUsernameFoundData == null || isUsernameFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  addUser,
  getAllUsers,
  isUsernameAlreadyExists,
  isEmailAlreadyTaken,
};
