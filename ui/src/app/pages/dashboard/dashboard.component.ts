import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ClientSideRowModelModule, ColDef, GridApi, Module} from 'ag-grid-community';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionDetails} from '../../model/transaction-details';
import { TransactionDetailsGrid } from '../../model/transaction-details-result';
import {TransactionService} from '../../service/transaction.service';
import {BexTransactionRequest, RequestBody} from '../../model/bexRequest';
import {HttpClient} from '@angular/common/http';
import {TransactionStatus} from '../../model/transaction-status';
import { IOUAcceptance } from '../../model/iouAcceptance';
import {SellerDashboardComponent} from '../seller-dashboard/seller-dashboard.component';
import {BuyerDashboardComponent} from '../buyer-dashboard/buyer-dashboard.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SellerDashboardComponent, BuyerDashboardComponent],
})
export class DashboardComponent implements OnInit {
  userRole: string = ''; // To store user role
  isFormOpen = false;
  amount : number= 0;
  billType = '';
  transactionStatus = 'In Progress';
  columnDefs: any[] = [];
  rowData: any[] = [];
  modules: Module[] = [ClientSideRowModelModule];
  transactionDetails: TransactionDetails = {} as TransactionDetails;
  transactionDetailsGrid: TransactionDetailsGrid = {} as TransactionDetailsGrid;


  transactionResult: any

  transactionResultGrid: any

  transactionForm!: FormGroup;
  private endorsements: string[] =  [];
  private acceptance: string = '';
  private boeDocs: string = '';
  private termsAndConditions: string = 't&c.........';
  private iso20022Message: string   = 'iso20022Message';
  // private clientRequestId: string
  private flowClassName: string = 'com.r3.developers.samples.obligation.workflows.IOUIssueFlow';

  constructor(private router: Router, private renderer: Renderer2, private transactionService: TransactionService, private http: HttpClient) {
    this.transactionDetailsGrid = this.transactionService.getTransactionDetailsGrid();
  }


  ngOnInit(): void {
    // Get user role from session storage (or another method)
    this.userRole = sessionStorage.getItem('userRole') || '';
    console.log("this.userRole", this.userRole);
  }

}
