export class BexTransactionRequest {
  clientRequestId: string;
  flowClassName: string;
  requestBody: RequestBody;

  constructor(
    clientRequestId: string,
    flowClassName: string,
    requestBody: RequestBody
  ) {
    this.clientRequestId = clientRequestId;
    this.flowClassName = flowClassName;
    this.requestBody = requestBody;
  }
}

export class RequestBody {
  amount: number;
  currency: string;
  drawer: string;
  drawee: string;
  payee: string;
  issueDate: string;
  dueDate: string;
  endorsements: string[];
  termsAndConditions: string;

  constructor(
    amount: number,
    currency: string,
    drawer: string,
    drawee: string,
    payee: string,
    issueDate: string,
    dueDate: string,
    endorsements: string[],
    termsAndConditions: string,
  ) {
    this.amount = amount;
    this.currency = currency;
    this.drawer = drawer;
    this.drawee = drawee;
    this.payee = payee;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.endorsements = endorsements;
    this.termsAndConditions = termsAndConditions;
  }
}
