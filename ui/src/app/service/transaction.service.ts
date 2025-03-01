import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BexTransactionRequest} from '../model/bexRequest';
import {Observable} from 'rxjs';
import {TransactionStatus} from '../model/transaction-status';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  private createTransactionUrl = 'http://localhost:8082/api/transactions/process';  // Update with actual backend URL
  private transactionStatusUrl = 'https://localhost:8888/api/v5_2/flow/';

  transactionDetails: TransactionDetails = new TransactionDetails(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','','');
 // Initialize with default values

  getTransactionDetails(): TransactionDetails {
    return this.transactionDetails;
  }

  setTransactionDetails(details: TransactionDetails): void {
    this.transactionDetails = details;
  }


  // Function to send BexTransactionRequest to the backend

  sendTransactionRequest(bexRequest: BexTransactionRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Ensure the backend knows it's JSON
      'Access-Control-Allow-Origin': '*', // This header should ideally be on the backend
    });

    console.log("bexRequest",bexRequest);
    return this.http.post(this.createTransactionUrl, bexRequest, { headers });
  }

  getStatusRequest(request: TransactionStatus): Observable<any> {
    return this.http.post(this.transactionStatusUrl, request, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
