export interface TransactionStatus {
  clientRequestId: string;
  flowClassName: string;
  requestBody: any; // You can replace `any` with a more specific type if needed
}
