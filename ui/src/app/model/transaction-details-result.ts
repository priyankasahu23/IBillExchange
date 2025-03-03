export class TransactionDetailsGrid {
  id: string;
  amount: number;
  currency: string;
  drawee: string;
  drawer: string;
  payee: string;
  issueDate: number;
  dueDate: number;
  acceptance: string;
  availisation: string;
  endorsements: any[];
  boeDocs: string;
  termsAndConditions: string;
  iso2022Message: string;

  constructor(
    id: string,
    amount: number,
    currency: string,
    drawee: string,
    drawer: string,
    payee: string,
    issueDate: number,
    dueDate: number,
    acceptance: string,
    availisation: string,
    endorsements: any[],
    boeDocs: string,
    termsAndConditions: string,
    iso2022Message: string
  ) {
    this.id = id;
    this.amount = amount;
    this.currency = currency;
    this.drawee = drawee;
    this.drawer = drawer;
    this.payee = payee;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.acceptance = acceptance;
    this.availisation = availisation;
    this.endorsements = endorsements;
    this.boeDocs = boeDocs;
    this.termsAndConditions = termsAndConditions;
    this.iso2022Message = iso2022Message;
  }
}
