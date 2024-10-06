export interface MessageRequest {
  email: string;
  message: string;
}

export interface MessageResponse {
  success: boolean;
  error?: {
    message: string;
    type: string;
  };
}
