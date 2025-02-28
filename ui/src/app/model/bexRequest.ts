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
  drawee: string;
  drawer: string;
  payee: string;
  issueDate: string;
  dueDate: string;
  acceptance: string;
  avalisation: string;
  endorsements: string[];
  boeDocs: string;
  termsAndConditions: string;
  iso20022Message: string;

  constructor(
    amount: number,
    currency: string,
    drawee: string,
    drawer: string,
    payee: string,
    issueDate: string,
    dueDate: string,
    acceptance: string,
    avalisation: string,
    endorsements: string[],
    boeDocs: string,
    termsAndConditions: string,
    iso20022Message: string
  ) {
    this.amount = amount;
    this.currency = currency;
    this.drawee = drawee;
    this.drawer = drawer;
    this.payee = payee;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.acceptance = acceptance;
    this.avalisation = avalisation;
    this.endorsements = endorsements;
    this.boeDocs = boeDocs;
    this.termsAndConditions = termsAndConditions;
    this.iso20022Message = iso20022Message;
  }
}
