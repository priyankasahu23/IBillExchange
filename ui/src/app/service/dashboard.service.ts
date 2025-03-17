import { Injectable } from '@angular/core';
import {TransactionDetails} from '../model/transaction-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private transactionSubject = new BehaviorSubject<TransactionDetails[]>([]);
  transaction$ = this.transactionSubject.asObservable();

  constructor(private http: HttpClient) { }

  addTransaction(transaction: any) {
    const updatedTransactions = [...this.transactionSubject.value, transaction];
    this.transactionSubject.next(updatedTransactions);
  }
}
