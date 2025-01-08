/* eslint-disable */
export type LoginRequest = {
  email: string;
  password: string;
}

export type VendingMachineCollection = {
  data: VendingMachineResource[];
  current_page: string;
  per_page: string;
  total: string;
  last_page: string;
}

export type VendingMachineMerchandiseResource = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_id: string;

  image: {
    id: string;
    alt: string;
    image_url: string;
  };

  author_id: string;

  author: {
    id: string;
    name: string;
  };

  last_edited_id: string;

  last_edited: {
    id: string;
    name: string;
  };

  stock_quantity: string;
  temperature_status: string;
}

export type VendingMachineResource = {
  id: string;
  name: string;
  description: string;

  background: {
    id: string;
    css_type: string;
  };

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

export type ModelNotFoundException = {
  /** Error overview. */
  message: string;
}

export type AuthenticationException = {
  /** Error overview. */
  message: string;
}
