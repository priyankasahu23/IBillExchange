import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';
import { TransactionDetailsGrid } from '../model/transaction-details-result';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BexTransactionRequest} from '../model/bexRequest';
import {Observable} from 'rxjs';
import {TransactionStatus} from '../model/transaction-status';
import {BexResponse} from '../model/bex-response';
import { IOUAcceptance } from '../model/iouAcceptance';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  private createTransactionUrl = 'https://localhost:8888/api/v5_2/flow/03DEBA2EBCEB';  //Seller Update with actual backend URL

  transactionDetailsGrid: TransactionDetailsGrid = new TransactionDetailsGrid('',0, '', '', '', '', 0, 0, '', '', [], '', '', '');
 // Initialize with default values

  getTransactionDetailsGrid(): TransactionDetailsGrid {
    return this.transactionDetailsGrid;
  }

  setTransactionDetailsGrid(details: TransactionDetailsGrid): void {
    this.transactionDetailsGrid = details;
  }


  // Function to send BexTransactionRequest to the backend
  private transactionStatusUrl!: string;

  sendTransactionRequest(bexRequest: BexTransactionRequest): Observable<BexResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Ensure the backend knows it's JSON
      'Access-Control-Allow-Origin': '*', // This header should ideally be on the backend
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
    });

    console.log("bexRequest",bexRequest);
    return this.http.post<BexResponse>(this.createTransactionUrl, bexRequest, { headers });
  }

  getStatusRequest(request: TransactionStatus): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
    });

    // First, call the POST API, then call the GET API -seller
    return this.http.post<any>("https://localhost:8888/api/v5_2/flow/03DEBA2EBCEB", request, { headers });
  }

    // New method to fetch data from the given endpoint
    fetchTransactionResult(clientRequestId: string): Observable<any> {
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
      });
      const url = `https://localhost:8888/api/v5_2/flow/03DEBA2EBCEB/${clientRequestId}/result`;  //seller
      return this.http.get<any>(url, { headers });
    }

    acceptanceRequest(request: IOUAcceptance): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      });

      // Buyer - First, call the POST API, then call the GET API
      return this.http.post<any>("https://localhost:8888/api/v5_2/flow/13C1384160C1", request, { headers });
    }

}
