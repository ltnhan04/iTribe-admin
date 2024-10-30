export interface LoginStateFulfilled {
  accessToken: string;
  name: string;
  message: string;
}

export interface LoginType {
  email: string;
  password: string;
}
