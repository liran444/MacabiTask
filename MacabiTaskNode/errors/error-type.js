// Basically ENUM, declaring an object that contains every variation of errors
let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message: "An error as occurred, please retry",
    isShowStackTrace: true,
  },
  USERNAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "Username already exists",
    isShowStackTrace: false,
  },
  EMAIL_ALREADY_TAKEN: {
    id: 3,
    httpCode: 602,
    message: "Email is already taken",
    isShowStackTrace: false,
  },
  INVALID_USERNAME: {
    id: 4,
    httpCode: 603,
    message: "Invalid username",
    isShowStackTrace: false,
  },
  INVALID_EMAIL: {
    id: 5,
    httpCode: 604,
    message: "Invalid email",
    isShowStackTrace: false,
  },
  INVALID_AGE: {
    id: 6,
    httpCode: 605,
    message: "Invalid age",
    isShowStackTrace: false,
  },
};

// Exporting ErrorType to external files...
module.exports = ErrorType;
