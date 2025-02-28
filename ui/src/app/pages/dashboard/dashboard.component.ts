import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {ClientSideRowModelModule, GridApi, Module} from 'ag-grid-community';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionDetails} from '../../model/transaction-details';
import {TransactionService} from '../../service/transaction.service';
import {BexTransactionRequest, RequestBody} from '../../model/bexRequest';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, AgGridAngular, FormsModule, ReactiveFormsModule],
})
export class DashboardComponent implements OnInit {
  userRole: string = ''; // To store user role
  isFormOpen = false;
  amount : number= 0;
  billType = '';
  receiverBank = '';
  transactionStatus = 'In Progress';
  columnDefs: any[] = [];
  rowData: any[] = [];
  modules: Module[] = [ClientSideRowModelModule];
  transactionDetails: TransactionDetails = {} as TransactionDetails;

  transactionForm!: FormGroup;
  private endorsements: string[] =  [];
  private acceptance: string = '';
  private boeDocs: string = '';
  private termsAndConditions: string = 't&c.........';
  private iso20022Message: string   = 'iso20022Message';
  private clientRequestId: string = this.generateClientRequestId();
  private flowClassName: string = 'com.example.transactionapi.TransactionFlow';

  constructor(private router: Router, private renderer: Renderer2, private transactionService: TransactionService, private http: HttpClient) {
    this.transactionDetails = this.transactionService.getTransactionDetails();
  }

  generateClientRequestId(): string {
    const timestamp = new Date().getTime();
    return `REQ${timestamp}`;
  }

  ngOnInit() {
    // Get user role from session storage (or another method)
    this.userRole = sessionStorage.getItem('userRole') || '';

    // Apply background based on user type
    if (this.userRole === 'SBI') {
      this.renderer.setStyle(
        document.body,
        'background-image',
        "url('\BOE-DLT-Project\LoginPage\src\assets\Rbi.jpg')"
      );
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.renderer.setStyle(document.body, 'background-position', 'center');
    } else {
      this.renderer.setStyle(
        document.body,
        'background-image',
        "url('\BOE-DLT-Project\LoginPage\src\assets\bill_of_exchange.jpg')"
      );
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.renderer.setStyle(document.body, 'background-position', 'center');
    }
    this.columnDefs = [
      { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1},
      { field: 'billType', headerName: 'Bill Type', sortable: true, filter: true, flex: 1 },
      { field: 'receiverBank', headerName: 'Receiver Bank', sortable: true, filter: true, flex: 1},
      { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
      { field: 'draweeCN', headerName: 'Drawee CN', sortable: true, filter: true,flex: 1 },
      // { field: 'draweeO', headerName: 'Drawee O', sortable: true, filter: true },
      // { field: 'draweeL', headerName: 'Drawee L', sortable: true, filter: true },
      // { field: 'draweeC', headerName: 'Drawee C', sortable: true, filter: true },
      { field: 'drawerCN', headerName: 'Drawer CN', sortable: true, filter: true, flex: 1 },
      // { field: 'drawerO', headerName: 'Drawer O', sortable: true, filter: true },
      // { field: 'drawerL', headerName: 'Drawer L', sortable: true, filter: true },
      // { field: 'drawerC', headerName: 'Drawer C', sortable: true, filter: true },
      { field: 'payeeCN', headerName: 'Payee CN', sortable: true, filter: true, flex: 1 },
      // { field: 'payeeO', headerName: 'Payee O', sortable: true, filter: true },
      // { field: 'payeeL', headerName: 'Payee L', sortable: true, filter: true },
      // { field: 'payeeC', headerName: 'Payee C', sortable: true, filter: true },
      { field: 'avalisation', headerName: 'Avalisation', sortable: true, filter: true, flex: 1 },
      { field: 'transactionStatus', headerName: 'Transaction Status', sortable: true, filter: true, flex: 1 }
    ];

    // Default row data (you can have multiple default rows if needed)
    this.rowData = [
      new TransactionDetails(
        1000, 'Sample Bill', 'SBI', 'INR', 'CN-01', 'Drawer-01', 'Drawee-01', 'DraweeL', 'DrawerCN', 'DrawerO', 'DrawerL', 'DrawerC', 'PayeeCN', 'PayeeO', 'PayeeL', 'PayeeC', '10/10/2024','10/12/2024','Avalisation', 'Pending'
      ),
      new TransactionDetails(
        5000, 'Bill 2', 'ICICI', 'INR', 'CN-02', 'Drawer-02', 'Drawee-02', 'DraweeL2', 'DrawerCN2', 'DrawerO2', 'DrawerL2', 'DrawerC2', 'PayeeCN2', 'PayeeO2', 'PayeeL2', 'PayeeC2','10/10/2024','10/12/2024', 'Avalisation', 'Completed'
      ),
      new TransactionDetails(
        1000, 'Sample Bill', 'SBI', 'INR', 'CN-01', 'Drawer-01', 'Drawee-01', 'DraweeL', 'DrawerCN', 'DrawerO', 'DrawerL', 'DrawerC', 'PayeeCN', 'PayeeO', 'PayeeL', 'PayeeC','10/10/2024','10/12/2024', 'Avalisation', 'Pending'
      ),
      new TransactionDetails(
        5000, 'Bill 2', 'ICICI', 'INR', 'CN-02', 'Drawer-02', 'Drawee-02', 'DraweeL2', 'DrawerCN2', 'DrawerO2', 'DrawerL2', 'DrawerC2', 'PayeeCN2', 'PayeeO2', 'PayeeL2', 'PayeeC2', '10/10/2024','10/12/2024', 'Avalisation', 'Completed'
      ),
    ];
  }


  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.transactionDetails = new TransactionDetails(
      0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','',''
    );
  }

  onGridReady(params: any) {
    params.api.autoSizeColumns();
  }

    submitForm() {
    if (this.transactionDetails.amount> 0) {
      const bexRequest = this.mapTransactionToBexRequest(this.transactionDetails);
      const newEntry = this.mapTransactionToGrid(this.transactionDetails);

      // ✅ Update the array using a new reference to trigger change detection
      this.rowData = [...this.rowData, newEntry];
      this.initiateTransaction(bexRequest);
      // Reset form
      this.closeForm();
    }
  }

  initiateTransaction(bexRequest: BexTransactionRequest) {
    this.transactionService.sendTransactionRequest(bexRequest).subscribe(
      (response) => {
        alert('BEX Token Generated Successfully!');
        console.log('Request successfully sent to backend:', response);
      },
      (error) => {
        console.error('Error sending request to backend:', error);
      }
    );
  }

  mapTransactionToBexRequest(transactionDetails: TransactionDetails): BexTransactionRequest {
    const requestBody = new RequestBody(
      transactionDetails.amount,
      transactionDetails.currency,

      // Format drawee, drawer, payee entities properly
      this.formatEntity(transactionDetails.draweeCN, transactionDetails.draweeO, transactionDetails.draweeL, transactionDetails.draweeC),
      this.formatEntity(transactionDetails.drawerCN, transactionDetails.drawerO, transactionDetails.drawerL, transactionDetails.drawerC),
      this.formatEntity(transactionDetails.payeeCN, transactionDetails.payeeO, transactionDetails.payeeL, transactionDetails.payeeC),

      // Include other fields directly
      transactionDetails.issuanceDate,
      transactionDetails.dueDate,
      this.acceptance,
      transactionDetails.avalisation,
      this.endorsements,
      this.boeDocs,
      this.termsAndConditions,
      this.iso20022Message
    );

    // Make sure you're passing the correct fields to the constructor of `BexTransactionRequest`
    return new BexTransactionRequest(
      this.clientRequestId,   // Assuming these are present in the form as well
      this.flowClassName,     // Same assumption as above
      requestBody  // The actual body of the request
    );
  }

// Ensures proper formatting of entities (drawee, drawer, payee)
  formatEntity(cn: string, o: string, l: string, c: string): string {
    return `${cn}, ${o}, ${l}, ${c}`;
  }


  mapTransactionToGrid(transaction: TransactionDetails): any {
    return {
      amount: transaction.amount,
      billType: transaction.billType,
      receiverBank: transaction.receiverBank,
      currency: transaction.currency,
      draweeCN: transaction.draweeCN,
      // draweeO: transaction.draweeO,
      // draweeL: transaction.draweeL,
      // draweeC: transaction.draweeC,
      drawerCN: transaction.drawerCN,
      // drawerO: transaction.drawerO,
      // drawerL: transaction.drawerL,
      // drawerC: transaction.drawerC,
      payeeCN: transaction.payeeCN,
      // payeeO: transaction.payeeO,
      // payeeL: transaction.payeeL,
      // payeeC: transaction.payeeC,
      avalisation: transaction.avalisation,
      transactionStatus: 'Pending' // Default status
    };
  }

  onRowSelected(event: any): void {
    // Check if a row is selected
    if (event.node.selected) {
      const selectedRowData = event.node.data;
      console.log("selectedRowData",selectedRowData)
      // Populate the form with selected row data
      this.transactionDetails = { ...selectedRowData };

      // Open the form (assuming `openForm()` handles showing the form)
      this.openForm();
    }
  }

}
