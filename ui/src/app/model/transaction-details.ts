export class TransactionDetails {
  clientRequestId: string;
  amount: number;
  billType: string;
  receiverBank: string;
  currency: string;
  draweeCN: string;
  draweeO: string;
  draweeL: string;
  draweeC: string;
  drawerCN: string;
  drawerO: string;
  drawerL: string;
  drawerC: string;
  payeeCN: string;
  payeeO: string;
  payeeL: string;
  payeeC: string;
  issuanceDate: string;
  dueDate: string;
  avalisation: string;
  transactionStatus: string;
  holdingIdentiy: string;


  constructor(
    clientRequestId: string,
    billType: string,
    amount: number,
    receiverBank: string,
    currency: string,
    draweeCN: string,
    draweeO: string,
    draweeL: string,
    draweeC: string,
    drawerCN: string,
    drawerO: string,
    drawerL: string,
    drawerC: string,
    payeeCN: string,
    payeeO: string,
    payeeL: string,
    payeeC: string,
    issuanceDate: string,
    dueDate: string,
    avalisation: string,
    transactionStatus: string,
    holdingIdentiy: string
  ) {
    this.clientRequestId = clientRequestId;
    this.amount = amount;
    this.billType = billType;
    this.receiverBank = receiverBank;
    this.currency = currency;
    this.draweeCN = draweeCN;
    this.draweeO = draweeO;
    this.draweeL = draweeL;
    this.draweeC = draweeC;
    this.drawerCN = drawerCN;
    this.drawerO = drawerO;
    this.drawerL = drawerL;
    this.drawerC = drawerC;
    this.payeeCN = payeeCN;
    this.payeeO = payeeO;
    this.payeeL = payeeL;
    this.payeeC = payeeC;
    this.issuanceDate = issuanceDate;
    this.dueDate = dueDate;
    this.avalisation = avalisation;
    this.transactionStatus = transactionStatus;
    this.holdingIdentiy = holdingIdentiy;
  }
}
