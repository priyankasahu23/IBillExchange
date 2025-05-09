export class TransactionDetails {
  clientRequestId: string;
  amount: number;
  billType: string;
  currency: string;
  sellerCN: string;
  sellerO: string;
  sellerL: string;
  sellerC: string;
  buyerBankCN: string;
  buyerBankO: string;
  buyerBankL: string;
  buyerBankC: string;
  buyerCN: string;
  buyerO: string;
  buyerL: string;
  buyerC: string;
  issuanceDate: string;
  dueDate: string;
  avalisation: string;
  transactionStatus: string;
  holdingIdentiy: string;


  constructor(
    clientRequestId: string,
    billType: string,
    amount: number,
    currency: string,
    sellerCN: string,
    sellerO: string,
  sellerL: string,
  sellerC: string,
  buyerBankCN: string,
  buyerBankO: string,
  buyerBankL: string,
  buyerBankC: string,
  buyerCN: string,
  buyerO: string,
  buyerL: string,
  buyerC: string,
    issuanceDate: string,
    dueDate: string,
    avalisation: string,
    transactionStatus: string,
    holdingIdentiy: string
  ) {
    this.clientRequestId = clientRequestId;
    this.amount = amount;
    this.billType = billType;
    this.currency = currency;
    this.sellerCN= sellerCN;
    this.sellerO= sellerO;
    this.sellerL= sellerL,
      this.sellerC= sellerC,
      this.buyerBankCN= buyerBankCN,
      this.buyerBankO= buyerBankO,
      this.buyerBankL= buyerBankL,
      this.buyerBankC= buyerBankC,
      this.buyerCN= buyerCN,
      this.buyerO= buyerO,
      this.buyerL= buyerL,
      this.buyerC= buyerC,
    this.issuanceDate = issuanceDate;
    this.dueDate = dueDate;
    this.avalisation = avalisation;
    this.transactionStatus = transactionStatus;
    this.holdingIdentiy = holdingIdentiy;
  }
}
