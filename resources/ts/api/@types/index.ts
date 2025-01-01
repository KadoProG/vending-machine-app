/* eslint-disable */
export type LoginRequest = {
  email: string;
  password: string;
}

export type ValidationException = {
  /** Errors overview. */
  message: string;

  /** A detailed description of each field that failed validation. */
  errors: {
    [key: string]: string[];
  };
}

export type AuthorizationException = {
  /** Error overview. */
  message: string;
}

export type AuthenticationException = {
  /** Error overview. */
  message: string;
}
