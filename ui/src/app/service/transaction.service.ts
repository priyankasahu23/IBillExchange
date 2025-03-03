import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BexTransactionRequest} from '../model/bexRequest';
import {Observable} from 'rxjs';
import {TransactionStatus} from '../model/transaction-status';
import {BexResponse} from '../model/bex-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  private createTransactionUrl = 'https://localhost:8888/api/v5_2/flow/92C32919F8DB';  // Update with actual backend URL

  transactionDetails: TransactionDetails = new TransactionDetails('','',0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','','');
 // Initialize with default values

  getTransactionDetails(): TransactionDetails {
    return this.transactionDetails;
  }

  setTransactionDetails(details: TransactionDetails): void {
    this.transactionDetails = details;
  }


  // Function to send BexTransactionRequest to the backend
  private transactionStatusUrl!: string;

  sendTransactionRequest(bexRequest: BexTransactionRequest): Observable<BexResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Ensure the backend knows it's JSON
      'Access-Control-Allow-Origin': '*', // This header should ideally be on the backend
    });

    console.log("bexRequest",bexRequest);
    return this.http.post<BexResponse>(this.createTransactionUrl, bexRequest, { headers });
  }

  getStatusRequest(request: TransactionStatus, holdingIdentity: string): Observable<any> {
   this.transactionStatusUrl = `https://localhost:8888/api/v5_2/flow/92C32919F8DB`;
    return this.http.post(this.transactionStatusUrl, request, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic YWRtaW46YWRtaW4=`}
    });
  }
}
