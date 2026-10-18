class ActionError extends Error {
  constructor(message) {
    super(message);
    this.name = "ActionError";
  }
}

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = new.target.name;
  }
}

// class UnauthenticatedError extends DomainError {
//   constructor(message = "Not logged in") {
//     super(message);
//   }
// }

class NotFoundError extends DomainError {
  constructor(message = "Not found") {
    super(message);
  }
}

// class UsernameTakenError extends DomainError {
//   constructor(message = "Username is already taken") {
//     super(message);
//   }
// }

module.exports = { ActionError, NotFoundError, DomainError };
