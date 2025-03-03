import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BexTransactionRequest} from '../model/bexRequest';
import {Observable} from 'rxjs';
import {TransactionStatus} from '../model/transaction-status';
import {BexResponse} from '../model/bex-response';
import { switchMap, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  private createTransactionUrl = 'https://localhost:8888/api/v5_2/flow/F67EE59351E5';  // Update with actual backend URL

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

  getStatusRequest(request: TransactionStatus): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
    });
  
    return this.http.post<any>(this.transactionStatusUrl, request, { headers }).
    pipe(
      tap(() => {
        console.log('POST request completed');
      }),
      switchMap(() => {
        const clientRequestId = request.clientRequestId;
        return this.http.get<any>(`${this.transactionStatusUrl}/${clientRequestId}/result`, { headers });
      })
    );
  }   
  
}
