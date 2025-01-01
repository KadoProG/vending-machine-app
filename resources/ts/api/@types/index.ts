/* eslint-disable */
export type BackgroundResource = {
  id: string;
  name: string;
  css_type: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type UserResource = {
  id: string;
  name: string;
  email: string;
}

export type VendingMachineCollection = {
  data: VendingMachineResource[];
}

export type VendingMachineResource = {
  id: string;
  name: string;
  background: BackgroundResource;
  author: UserResource;
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
