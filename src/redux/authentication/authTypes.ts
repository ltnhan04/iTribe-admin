export interface LoginState {
  accessToken: string;
  name: string;
  message: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
