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

export type VendingMachineCollection = {
  data: VendingMachineResource[];
}

export type VendingMachineResource = {
  id: string;
  name: string;
  description: string;
  background_id: string;

  background: BackgroundResource | null;

  author: {
    id: string;
    name: string;
    email: string;

    image: {
      id: string;
      alt: string;
      image_url: string;
    };
  };
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
