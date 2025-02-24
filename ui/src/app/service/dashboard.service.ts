import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) { }

  sendTransaction(request: TransactionDetails): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>("apiUrl/need to replace with api/", request, { headers });
  }
}
