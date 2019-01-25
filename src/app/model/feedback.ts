export interface Feedback {
  isApiCallPending?: boolean;
  error?: {
    isError: boolean;
    errorMessage?: string;
  };
}
