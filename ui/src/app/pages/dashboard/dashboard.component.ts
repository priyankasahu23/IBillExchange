import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {ClientSideRowModelModule, ColDef, GridApi, Module} from 'ag-grid-community';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionDetails} from '../../model/transaction-details';
import {TransactionService} from '../../service/transaction.service';
import {BexTransactionRequest, RequestBody} from '../../model/bexRequest';
import {HttpClient} from '@angular/common/http';
import {TransactionStatus} from '../../model/transaction-status';


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
  // private clientRequestId: string
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
    console.log("this.userRole",this.userRole);
    //column for Buyer
    this.columnDefs = [
      { field: 'clientRequestId', headerName: 'clientRequestId', sortable: true, filter: true, flex: 1},
      { field: 'billType', headerName: 'Product Type', sortable: true, filter: true, flex: 1.5},
      { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1},
      { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
      { field: 'buyerBankCN', headerName: 'Buyer Bank Name', sortable: true, filter: true, flex: 1,
        valueGetter: (params: any) => {
          const cn = params.data.buyerBankCN || '';
          // Returning the combined string
          return `${cn}`;
        }
        },
      { field: 'buyerCN', headerName: 'Buyer Name', sortable: true, filter: true, flex: 1 ,
        valueGetter: (params: any) => {
          const cn = params.data.buyerCN || '';

          // Returning the combined string
          return `${cn}`;
        }
      },
      { field: 'dueDate', headerName: 'Due Date', sortable: true, filter: true, flex: 1},
      { field: 'avalisation', headerName: 'Avalisation', sortable: true, filter: true, flex: 1 },
      { field: 'transactionStatus', headerName: 'Transaction Status', sortable: true, filter: true, flex: 2,
        cellRenderer: (params: any) => {
          // Create a button for the 'Transaction Status' column
          const button = document.createElement('button');
          button.innerHTML = 'Get Transaction Details';
          button.addEventListener('click', () => {
            this.getTransactionDetails(params.data); // Call the function on click
          });
          return button;
        }}
    ];

    // Default row data (you can have multiple default rows if needed)
   this.rowData = [
      new TransactionDetails(
        'REQ1740845361862','Documentary Collection',1000,'INR', 'CN-01', 'buyerBank-01', 'seller-01', 'sellerL', 'buyerBankCN', 'buyerBankO', 'buyerBankL', 'buyerBankC', 'buyerCN', 'buyerO', 'buyerL', 'buyerC', '10/10/2024','10/12/2024','Avalisation', 'Pending', ''
      ),
      new TransactionDetails(
        'REQ1740845361876','Documentary Collection',5000, 'INR', 'CN-02', 'buyerBank-02', 'seller-02', 'sellerL2', 'buyerBankCN2', 'buyerBankO2', 'buyerBankL2', 'buyerBankC2', 'buyerCN2', 'buyerO2', 'buyerL2', 'buyerC2','10/10/2024','10/12/2024', 'Avalisation', 'Completed',''
      ),
      new TransactionDetails(
        'REQ1740845361890','Documentary Collection',1000, 'INR', 'CN-01', 'buyerBank-01', 'seller-01', 'sellerL', 'buyerBankCN', 'buyerBankO', 'buyerBankL', 'buyerBankC', 'buyerCN', 'buyerO', 'buyerL', 'buyerC','10/10/2024','10/12/2024', 'Avalisation', 'Pending',''
      ),
      new TransactionDetails(
        'REQ1740845361789','Documentary Collection',5000, 'INR', 'CN-02', 'buyerBank-02', 'seller-02', 'sellerL2', 'buyerBankCN2', 'buyerBankO2', 'buyerBankL2', 'buyerBankC2', 'buyerCN2', 'buyerO2', 'buyerL2', 'buyerC2', '10/10/2024','10/12/2024', 'Avalisation', 'Completed',''
      ),
    ];
  }


  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.transactionDetails = new TransactionDetails(
      '','',0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','',''
    );
  }

  onGridReady(params: any) {
    params.api.autoSizeColumns();
  }

    submitForm() {
    if (this.transactionDetails.amount> 0) {
      this.transactionDetails.clientRequestId =  this.generateClientRequestId();
      const bexRequest = this.mapTransactionToBexRequest(this.transactionDetails);
      console.log("this.transactionDetails",this.transactionDetails);
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
        console.log("Response BEX Token "+response)
        this.transactionDetails.holdingIdentiy = response.holdingIdentityShortHash
        alert('BEX Token Generated Successfully!');
        console.log('Request successfully sent to backend:', response);
      },
      (error) => {
        console.error('Error sending request to backend:', error);
      }
    );
  }

  getTransactionDetails(rowData: any) {
    console.log("rowdata", rowData);
    const requestBody: TransactionStatus = {
      clientRequestId: rowData.clientRequestId,
      flowClassName: 'com.r3.developers.samples.obligation.workflows.ListIOUFlow',
      requestBody: {} // Modify if rowData needs to be included
    };
  
    this.transactionService.getStatusRequest(requestBody).subscribe(
      (response) => {
        // Directly display the response object
        alert(`Transaction Details: ${response}`);
      },
      (error) => {
        alert(`Error: ${error.message}`);
      }
    );
  }

  mapTransactionToBexRequest(transactionDetails: TransactionDetails): BexTransactionRequest {
    const requestBody = new RequestBody(
      transactionDetails.amount,
      transactionDetails.currency,

      // Format seller, buyerBank, buyer entities properly
      this.formatEntity(transactionDetails.sellerCN, transactionDetails.sellerO, transactionDetails.sellerL, transactionDetails.sellerC),
      this.formatEntity(transactionDetails.buyerBankCN, transactionDetails.buyerBankO, transactionDetails.buyerBankL, transactionDetails.buyerBankC),
      this.formatEntity(transactionDetails.buyerCN, transactionDetails.buyerO, transactionDetails.buyerL, transactionDetails.buyerC),

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
      transactionDetails.clientRequestId,   // Assuming these are present in the form as well
      this.flowClassName,     // Same assumption as above
      requestBody  // The actual body of the request
    );
  }

// Ensures proper formatting of entities (seller, buyerBank, buyer)
  formatEntity(cn: string, o: string, l: string, c: string): string {
    return `${cn}, ${o}, ${l}, ${c}`;
  }


  mapTransactionToGrid(transaction: TransactionDetails): any {
    return {
      clientRequestId: transaction.clientRequestId,
      billType: transaction.billType,
      amount: transaction.amount,
      currency: transaction.currency,
      sellerCN: transaction.sellerCN,
      // sellerO: transaction.sellerO,
      // sellerL: transaction.sellerL,
      // sellerC: transaction.sellerC,
      buyerBankCN: transaction.buyerBankCN,
      // buyerBankO: transaction.buyerBankO,
      // buyerBankL: transaction.buyerBankL,
      // buyerBankC: transaction.buyerBankC,
      buyerCN: transaction.buyerCN,
      // buyerO: transaction.buyerO,
      // buyerL: transaction.buyerL,
      // buyerC: transaction.buyerC,
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

  currencyList: string[] = ['INR','EURO','DOLLARS','GBP'];
  billTypeList: string[] =['Letter of Credit(LC)','Purchase Order(PO) Finanace','Supply Chain Finance(SCF)',
    'Trade Credit','Receivable Financing','Documentary Collection','Bank Guarantees','Export and Import Loans'] ;

  cnList = [
    { cn: 'ABC Imports', o: 'ABC Imports', l: 'India', c: 'IN' },
    { cn: 'Global Exports', o: 'Global Exports', l: 'India', c: 'IN' },
    { cn: 'ICICI Bank', o: 'ICICI Bank', l: 'India', c: 'IN' },
    { cn: 'RBI Bank', o: 'Reserve Bank of India', l: 'India', c: 'IN' },
    { cn: 'LBG Bank', o: 'Lloyds Banking group', l: 'FrankfuLondonert', c: 'GB' },
    // { cn: 'State Bank of India', o: 'SBI Corporate', l: 'Mumbai', c: 'India' },
    // { cn: 'HDFC Bank', o: 'HDFC Financial Services', l: 'Delhi', c: 'India' },
    // { cn: 'Citibank', o: 'Citibank NA', l: 'New York', c: 'USA' },
    // { cn: 'Barclays', o: 'Barclays UK', l: 'London', c: 'UK' },
    // { cn: 'Deutsche Bank', o: 'Deutsche Bank AG', l: 'Frankfurt', c: 'Germany' },
    // { cn: 'Standard Chartered', o: 'Standard Chartered PLC', l: 'Singapore', c: 'Singapore' },
    // { cn: 'HSBC', o: 'HSBC Holdings', l: 'Hong Kong', c: 'China' }
  ];


updateDetails(type: 'seller' | 'buyerBank' | 'buyer') {
  const selectedCN = this.transactionDetails[`${type}CN` as keyof TransactionDetails];

  const selectedItem = this.cnList.find(item => item.cn === selectedCN);

  if (selectedItem) {
    (this.transactionDetails as any)[`${type}O`] = selectedItem.o;
    (this.transactionDetails as any)[`${type}L`] = selectedItem.l;
    (this.transactionDetails as any)[`${type}C`] = selectedItem.c;
  }
}

  columnDef_Buyer: ColDef[] = [
    { field: 'clientRequestId', headerName: 'clientRequestId', sortable: true, filter: true, flex: 1},
    { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1 },
    { field: 'receiverBank', headerName: 'Receiver Bank', sortable: true, filter: true, flex: 1 },
    { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
    { field: 'sellerDetails', headerName: 'seller Details', sortable: true, filter: true,flex: 1,
      valueGetter: (params: any) => {
        const cn = params.data.sellerCN || '';
        const o = params.data.sellerO || '';
        const l = params.data.sellerL || '';
        const c = params.data.sellerC || '';

        // Returning the combined string
        return `{ cn: ${cn}, o: ${o}, l: ${l}, c: ${c} }`;
      }
    },
    { field: 'buyerBankCN', headerName: 'buyerBank Details', sortable: true, filter: true, flex: 1,
      valueGetter: (params: any) => {
        const cn = params.data.buyerBankCN || '';
        const o = params.data.buyerBankO || '';
        const l = params.data.buyerBankL || '';
        const c = params.data.buyerBankC || '';

        // Returning the combined string
        return `{ cn: ${cn}, o: ${o}, l: ${l}, c: ${c} }`;
      }
    },
    { field: 'buyerCN', headerName: 'buyer Details', sortable: true, filter: true, flex: 1 ,
      valueGetter: (params: any) => {
        const cn = params.data.buyerCN || '';
        const o = params.data.buyerO || '';
        const l = params.data.buyerL || '';
        const c = params.data.buyerC || '';

        // Returning the combined string
        return `{ cn: ${cn}, o: ${o}, l: ${l}, c: ${c} }`;
      }
    },
    {
      field: 'transactionStatus',
      headerName: 'Approval Pending',
      flex: 1,
      cellRenderer: (params: any) => `<button class="red-btn">Approval Pending</button>`,
      onCellClicked: (params: any) => this.openPopup(params.data)
    }
  ];

  selectedTransaction: any = null;
  showPopup: boolean = false;

  openPopup(transaction: any) {
    console.log("In Open pop Up......",transaction);
    this.selectedTransaction = transaction;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  updateTransaction(status: string) {
    if (this.selectedTransaction) {
      this.selectedTransaction.transactionStatus = status;
      this.rowData = [...this.rowData]; // Refresh grid
      alert(`Transaction ${status}`);
      this.closePopup();
    }
  }

  addTransaction(newTransaction: any) {
    newTransaction.id = this.rowData.length + 1;
    this.rowData.push(newTransaction);
    this.rowData.sort((a, b) => b.id - a.id); // Sort latest first
    this.rowData = [...this.rowData];
  }
}
