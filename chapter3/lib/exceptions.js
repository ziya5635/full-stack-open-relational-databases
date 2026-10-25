class ActionError extends Error {
  constructor(message) {
    super(message);
    this.name = "ActionError";
  }
}

class DomainError extends Error {
  static status = 400;
  constructor(message) {
    super(message);
    this.name = new.target.name;
  }
}
//Unauthenticated: Identity is unknown.
class UnauthenticatedError extends DomainError {
  static status = 401;
  constructor(message = "Not logged in") {
    super(message);
  }
}
//Unauthorized: Identity is known, but permission is denied.
class UnauthorizedError extends DomainError {
  static status = 403;
  constructor(message = "Action not allowed") {
    super(message);
  }
}

class NotFoundError extends DomainError {
  static status = 404;
  constructor(message = "Not found") {
    super(message);
  }
}

module.exports = {
  ActionError,
  NotFoundError,
  DomainError,
  UnauthorizedError,
  UnauthenticatedError,
};
