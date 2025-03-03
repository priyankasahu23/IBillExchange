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
  seller: string;
  buyerBank: string;
  buyer: string;
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
    seller: string,
    buyerBank: string,
    buyer: string,
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
    this.seller = seller;
    this.buyerBank = buyerBank;
    this.buyer = buyer;
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
