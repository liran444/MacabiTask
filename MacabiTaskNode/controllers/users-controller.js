const express = require("express");
const usersLogic = require("../logic/users-logic");
const router = express.Router();

// POST http://localhost:3000/users/
router.post("/", async (request, response, next) => {
  // Extracting from the request's body the details of the new user that's supposed to be added
  let userDetails = request.body;

  try {
    await usersLogic.addUser(userDetails);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/users/
router.get("/", async (request, response, next) => {
  try {
    let usersRetrievalResult = await usersLogic.getAllUsers();
    response.json(usersRetrievalResult);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
