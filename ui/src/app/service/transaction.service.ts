import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  transactionDetails: TransactionDetails = new TransactionDetails(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');
 // Initialize with default values

  getTransactionDetails(): TransactionDetails {
    return this.transactionDetails;
  }

  setTransactionDetails(details: TransactionDetails): void {
    this.transactionDetails = details;
  }
}
