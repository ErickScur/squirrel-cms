enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

class GeneralError {
  constructor(public message?: string, private originalError?: any) {}
}

class HTTPGeneralError extends GeneralError {
  constructor(public message: string, public statusCode: number) {
    super();
  }
}

class HTTPBadRequest extends HTTPGeneralError {
  constructor(message: string) {
    super(message, HTTPStatus.BAD_REQUEST);
  }
}

class HTTPUnauthorized extends HTTPGeneralError {
  constructor(message: string) {
    super(message, HTTPStatus.UNAUTHORIZED);
  }
}

class HTTPForbidden extends HTTPGeneralError {
  constructor(message: string) {
    super(message, HTTPStatus.FORBIDDEN);
  }
}

class HTTPNotFound extends HTTPGeneralError {
  constructor(message: string) {
    super(message, HTTPStatus.NOT_FOUND);
  }
}

class HTTPInternalServer extends HTTPGeneralError {
  constructor(message: string) {
    super(message, HTTPStatus.INTERNAL_SERVER_ERROR);
  }
}

export {
  HTTPBadRequest,
  HTTPUnauthorized,
  HTTPForbidden,
  HTTPNotFound,
  HTTPInternalServer,
};
