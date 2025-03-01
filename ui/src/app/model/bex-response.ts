export interface BexResponse {
  holdingIdentityShortHash: string;
  clientRequestId: string;
  flowId: string | null;
  flowStatus: string;
  flowResult: string | null;
  flowError: string | null;
  timestamp: string; //
}
