export interface IOUAcceptance {
    clientRequestId: string;
    flowClassName: string;
    requestBody: IOURequestBody;
}

export interface IOURequestBody {
    payeeAcceptance: boolean;
    iouID: string;
}