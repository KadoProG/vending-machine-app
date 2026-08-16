/* eslint-disable */
export type Image = {
  id: string;
  name: string;
  disk: string;
  path: string;
  original_name: string;
  mime_type: string;
  size: number;
  public_type: string;
  url: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type MerchandiseCollection = {
  data: MerchandiseResource[];
  current_page: string;
  per_page: string;
  total: string;
  last_page: string;
}

export type MerchandiseResource = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_id: string;

  image: {
    id: string;
    alt: string;
    url: string;
  };

  author_id: string;

  author: {
    id: string;
    name: string;
  };
}

export type UserResource = {
  id: string;
  name: string;
  email: string;
  image: Image;
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
    url: string;
  };

  author_id: string;

  author: {
    id: string;
    name: string;
  };

  shelf_column: number;
  shelf_row: number;
  stock_quantity: string;
  temperature_status: string;
}

export type VendingMachineResource = {
  id: string;
  name: string;
  description: string;
  column_count: number;
  row_count: number;

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
      url: string;
    };
  };
}

export type ModelNotFoundException = {
  /** Error overview. */
  message: string;
}

export type AuthenticationException = {
  /** Error overview. */
  message: string;
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
