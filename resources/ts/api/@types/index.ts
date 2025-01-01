/* eslint-disable */
export type BackgroundResource = {
  id: string;
  name: string;
  css_type: string;
}

export type Image = {
  id: string;
  name: string;
  image_url: string;
  public_type: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type UserResource = {
  id: string;
  name: string;
  email: string;
  image: Image;
}

export type VendingMachineCollection = {
  data: VendingMachineResource[];
}

export type VendingMachineResource = {
  id: string;
  name: string;
  description: string;
  background_id: string;
  author_id: string;

  background: BackgroundResource | null;

  author: UserResource | null;
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
