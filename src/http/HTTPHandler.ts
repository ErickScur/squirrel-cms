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

class AppError {
  constructor(public message?: string, private originalError?: any) {}
}

class HttpError extends AppError {
  constructor(public message: string, public status: number) {
    super();
  }
}

class HTTPBadRequest extends HttpError {
  constructor(message: string) {
    super(message, HTTPStatus.BAD_REQUEST);
  }
}

class HTTPUnauthorized extends HttpError {
  constructor(message: string) {
    super(message, HTTPStatus.UNAUTHORIZED);
  }
}

class HTTPForbidden extends HttpError {
  constructor(message: string) {
    super(message, HTTPStatus.FORBIDDEN);
  }
}

class HTTPNotFound extends HttpError {
  constructor(message: string) {
    super(message, HTTPStatus.NOT_FOUND);
  }
}

class HTTPInternalServer extends HttpError {
  constructor(message: string) {
    super(message, HTTPStatus.INTERNAL_SERVER_ERROR);
  }
}

export {
  HttpError,
  HTTPBadRequest,
  HTTPUnauthorized,
  HTTPForbidden,
  HTTPNotFound,
  HTTPInternalServer,
};
