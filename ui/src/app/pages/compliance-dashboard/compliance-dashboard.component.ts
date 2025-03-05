import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ClientSideRowModelModule, ColDef, GridApi, Module } from 'ag-grid-community';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionDetails } from '../../model/transaction-details';
import { TransactionDetailsGrid } from '../../model/transaction-details-result';
import { TransactionService } from '../../service/transaction.service';
import { BexTransactionRequest, RequestBody } from '../../model/bexRequest';
import { HttpClient } from '@angular/common/http';
import { TransactionStatus } from '../../model/transaction-status';
import { IOUAcceptance } from '../../model/iouAcceptance';

@Component({
  selector: 'app-compliance-dashboard',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FormsModule, ReactiveFormsModule],
  templateUrl: './compliance-dashboard.component.html',
  styleUrl: './compliance-dashboard.component.css'
})
export class ComplianceDashboardComponent implements OnInit {

  userRole: string = ''; // To store user role
  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  transactionResult: any;
  transactionResultGrid: any;
  modules: Module[] = [ClientSideRowModelModule];
  transactionDetails: TransactionDetails = {} as TransactionDetails;
  transactionDetailsGrid: TransactionDetailsGrid = {} as TransactionDetailsGrid;

  constructor(private transactionService: TransactionService, private http: HttpClient) {
    this.transactionDetailsGrid = this.transactionService.getTransactionDetailsGrid();
  }

  ngOnInit(): void {
    // Get user role from session storage (or another method)
    this.userRole = sessionStorage.getItem('userRole') || '';
    console.log("this.userRole", this.userRole);

    // Define columns for Buyer
    this.columnDefs = [
      { field: 'id', headerName: 'Client Request ID', sortable: true, filter: true, flex: 1 },
      { field: 'billType', headerName: 'Product Type', sortable: true, filter: true, flex: 1.5 },
      { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1 },
      { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
      { field: 'buyerBank', headerName: 'Buyer Bank Name', sortable: true, filter: true, flex: 1 },
      { field: 'buyer', headerName: 'Buyer Name', sortable: true, filter: true, flex: 1 },
      { field: 'dueDate', headerName: 'Due Date', sortable: true, filter: true, flex: 1 },
      { field: 'avalisation', headerName: 'Avalisation', sortable: true, filter: true, flex: 1 }
    ];

    // Fetch and populate table data
    this.getTransactionResult();
  }

  getTransactionResult(): void {
    const clientRequestId = 'REQ1741094856716'; // Replace with actual clientRequestId
    const requestBody: TransactionStatus = {
      clientRequestId: clientRequestId,
      flowClassName: 'com.r3.developers.samples.obligation.workflows.ListIOUFlow',
      requestBody: {} // Modify if rowData needs to be included
    };

    this.transactionService.getStatusRequest(requestBody).subscribe(
      (response: any) => {
        console.log("response", response);
      },
      (error: { message: any; }) => {
        alert(`Error: ${error.message}`);
      }
    );

    setTimeout(() => {
      this.transactionService.fetchTransactionResult(clientRequestId).subscribe(
        (result: any) => {
          this.transactionResultGrid = result;
          console.log("result.....", result);
          this.rowData = this.mapTransactionResponse(this.transactionResultGrid.json);
          console.log("Seller this.rowData", this.rowData);
        },
        (error: any) => {
          console.error('Error fetching transaction result', error);
        }
      );
    }, 3000); // 3 seconds delay
  }

  mapTransactionResponse(response: any[]): any[] {
    if (!response || response.length === 0) {
      return [];
    }
    return response.map(item => ({
      id: item.id,
      billType: 'Documentary Collection',
      amount: item.amount,
      currency: item.currency,
      buyerBank: this.extractCN(item.drawee),
      buyer: this.extractCN(item.payee),
      dueDate: item.dueDate ? new Date(item.dueDate * 1000).toLocaleDateString() : '',
      avalisation: 'Yes'
    }));
  }

  extractCN(dn: any): string {
    if (typeof dn === 'string') {
      const match = dn.match(/CN=([^,]+)/);
      return match ? match[1] : dn;
    } else if (typeof dn === 'object' && dn.CN) {
      return dn.CN;
    }
    return '';
  }
  onGridReady(params: any): void {
    const gridApi = params.api;
    console.log("Grid is ready", gridApi);
  }
  onRowSelected(event: any): void {
    console.log("Row selected", event);
  }
  
}