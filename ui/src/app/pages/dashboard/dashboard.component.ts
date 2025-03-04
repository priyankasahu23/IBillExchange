import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {ClientSideRowModelModule, ColDef, GridApi, Module} from 'ag-grid-community';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionDetails} from '../../model/transaction-details';
import { TransactionDetailsGrid } from '../../model/transaction-details-result';
import {TransactionService} from '../../service/transaction.service';
import {BexTransactionRequest, RequestBody} from '../../model/bexRequest';
import {HttpClient} from '@angular/common/http';
import {TransactionStatus} from '../../model/transaction-status';
import { IOUAcceptance } from '../../model/iouAcceptance';


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

  generateClientRequestId(): string {
    const timestamp = new Date().getTime();
    return `REQ${timestamp}`;
  }

  ngOnInit(): void {
    // Get user role from session storage (or another method)
    this.userRole = sessionStorage.getItem('userRole') || '';
    console.log("this.userRole", this.userRole);

    // Define columns for Buyer
    this.columnDefs = [
      { field: 'id', headerName: 'clientRequestId', sortable: true, filter: true, flex: 1 },
      { field: 'billType', headerName: 'Product Type', sortable: true, filter: true, flex: 1.5 },
      { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1 },
      { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
      {
        field: 'buyerBank', headerName: 'Buyer Bank Name', sortable: true, filter: true, flex: 1,
        // valueGetter: (params: any) => {
        //   const cn = params.data.buyerBankCN || '';
        //   // Returning the combined string
        //   return `${cn}`;
        // }
      },
      {
        field: 'buyer', headerName: 'Buyer Name', sortable: true, filter: true, flex: 1,
        // valueGetter: (params: any) => {
        //   const cn = params.data.buyerCN || '';
        //   // Returning the combined string
        //   return `${cn}`;
        // }
      },
      { field: 'dueDate', headerName: 'Due Date', sortable: true, filter: true, flex: 1 },
      { field: 'avalisation', headerName: 'Avalisation', sortable: true, filter: true, flex: 1 },
    ];

    // Fetch and populate table data
        this.getTransactionResult();
  }

  getTransactionResult(): void {
    const clientRequestId = this.generateClientRequestId(); // Replace with the actual clientRequestId
    const requestBody: TransactionStatus = {
      clientRequestId: clientRequestId,
      flowClassName: 'com.r3.developers.samples.obligation.workflows.ListIOUFlow',
      requestBody: {} // Modify if rowData needs to be included
    };
    this.transactionService.getStatusRequest(requestBody).subscribe(
          (response: any) => {
            // Directly display the response object
            // alert(`Transaction Details: ${response}`);
            console.log("response",response);
          },
          (error: { message: any; }) => {
            alert(`Error: ${error.message}`)});

    // Add a delay before the second API call
    setTimeout(() => {
      this.transactionService.fetchTransactionResult(clientRequestId).subscribe(
        (result: any) => {
        
          this.transactionResultGrid = result;
          // Assuming the API returns an array of TransactionDetails

          console.log("result.....",result);
          // this.rowData = this.transactionResultGrid.json;
          if(this.userRole == 'SBI'){
          this.rowData = this.mapTransactionResponse(this.transactionResultGrid.json);
          console.log("Seller this.rowData",this.rowData);
          }else if(this.userRole == 'Buyer'){
            this.rowData = this.mapTransactionBuyerResponse(this.transactionResultGrid.json);
          }
          
        },
        (error: any) => {
          console.error('Error fetching transaction result', error);
        }
      );
    }, 3000); // 3000 milliseconds = 3 seconds delay
  }

  extractCN(dn: any): string {
    if (typeof dn === 'string') {
      const match = dn.match(/CN=([^,]+)/);
      return match ? match[1] : dn; // Return extracted CN or full string if CN is not found
    } else if (typeof dn === 'object' && dn.CN) {
      return dn.CN; // Access CN directly if drawee is a JSON object
    }
    return ''; // Return empty string if undefined or invalid format
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
    // issueDate: item.issueDate ? new Date(item.issueDate * 1000).toLocaleDateString() : '',
    dueDate: item.dueDate ? new Date(item.dueDate * 1000).toLocaleDateString() : '',
    avalisation: 'Yes'
  }));
}


  // getTransactionDetails() {
  //   //console.log("rowdata", rowData);
  //   const requestBody: TransactionStatus = {
  //     clientRequestId: rowData.clientRequestId,
  //     flowClassName: 'com.r3.developers.samples.obligation.workflows.ListIOUFlow',
  //     requestBody: {} // Modify if rowData needs to be included
  //   };
  
  //   this.transactionService.getStatusRequest(requestBody).subscribe(
  //     (response: any) => {
  //       // Directly display the response object
  //       alert(`Transaction Details: ${response}`);
  //     },
  //     (error: { message: any; }) => {
  //       alert(`Error: ${error.message}`);
  //   }
  //   );
  //  }

   

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.transactionDetails = new TransactionDetails(
      '','',0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','','','','',''
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
      // const newEntry = this.mapTransactionToBexRequest(this.transactionDetails); // TODO:

      // ✅ Update the array using a new reference to trigger change detection
      // this.rowData = [...this.rowData, newEntry];
      this.initiateTransaction(bexRequest);
      // Reset form
      this.closeForm();
    }
  }

  initiateTransaction(bexRequest: BexTransactionRequest) {
    this.transactionService.sendTransactionRequest(bexRequest).subscribe(
      (response: any) => {
        console.log("Response BEX Token "+response)
        this.transactionDetails.holdingIdentiy = response.holdingIdentityShortHash
        alert('BEX Token Generated Successfully!');
        console.log('Request successfully sent to backend:', response);
      },
      (error: any) => {
        console.error('Error sending request to backend:', error);
      }
    );
  }

  

  

  mapTransactionToBexRequest(transactionDetails: TransactionDetails): BexTransactionRequest {
    const requestBody = new RequestBody(
      transactionDetails.amount,
      transactionDetails.currency,

      // Format seller, buyerBank, buyer entities properly
      this.formatEntity(transactionDetails.sellerCN, transactionDetails.sellerOU ,transactionDetails.sellerO, transactionDetails.sellerL, transactionDetails.sellerC),
      this.formatEntity(transactionDetails.buyerBankCN, transactionDetails.buyerBankOU ,transactionDetails.buyerBankO, transactionDetails.buyerBankL, transactionDetails.buyerBankC),
      this.formatEntity(transactionDetails.buyerCN, transactionDetails.buyerOU ,transactionDetails.buyerO, transactionDetails.buyerL, transactionDetails.buyerC),

      // Include other fields directly
      transactionDetails.issuanceDate,
      transactionDetails.dueDate,
      this.endorsements,
      this.termsAndConditions,
    );

    // Make sure you're passing the correct fields to the constructor of `BexTransactionRequest`
    return new BexTransactionRequest(
      transactionDetails.clientRequestId,   // Assuming these are present in the form as well
      this.flowClassName,     // Same assumption as above
      requestBody  // The actual body of the request
    );
  }

// Ensures proper formatting of entities (seller, buyerBank, buyer)
  formatEntity(cn: string, ou: string, o: string, l: string, c: string): string {
    return `CN=${cn}, OU=${ou}, O=${o}, L=${l}, C=${c}`;
  }


  mapTransactionToGrid(transaction: TransactionDetailsGrid): any {
    return {
      clientRequestId: transaction.id,
      billType: "Contract Document",
      amount: transaction.amount,
      currency: transaction.currency,
      sellerCN: transaction.drawer,
      // sellerO: transaction.sellerO,
      // sellerL: transaction.sellerL,
      // sellerC: transaction.sellerC,
      buyerBankCN: transaction.drawee,
      // buyerBankO: transaction.buyerBankO,
      // buyerBankL: transaction.buyerBankL,
      // buyerBankC: transaction.buyerBankC,
      buyerCN: transaction.payee,
      // buyerO: transaction.buyerO,
      // buyerL: transaction.buyerL,
      // buyerC: transaction.buyerC,
      avalisation: "Avalised",
      transactionStatus: 'Pending' // Default status
    };
  }

  onRowSelected(event: any): void {
    // Check if a row is selected
    if (event.node.selected) {
      const selectedRowData = event.node.data;
      console.log("selectedRowData",selectedRowData)
      // Populate the form with selected row data
    }
  }

  currencyList: string[] = ['INR','EURO','DOLLARS','GBP'];
  billTypeList: string[] =['Letter of Credit(LC)','Purchase Order(PO) Finanace','Supply Chain Finance(SCF)',
    'Trade Credit','Receivable Financing','Documentary Collection','Bank Guarantees','Export and Import Loans'] ;

  cnList = [
    { cn: 'ABC Imports', ou: "Imports Dept",o: 'ABC Imports', l: 'India', c: 'IN' },
    { cn: 'Global Exports', ou: "Exports Dept",o: 'Global Exports', l: 'London', c: 'GB' },
    { cn: 'ICICI Bank', ou: "Banking Dept",o: 'ICICI Bank', l: 'India', c: 'IN' },
    { cn: 'RBI Bank', ou: "Banking Dept",o: 'Reserve Bank of India', l: 'India', c: 'IN' },
    { cn: 'LBG Bank', ou: "Banking Dept",o: 'Lloyds Banking Group', l: 'London', c: 'GB' },
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
    (this.transactionDetails as any)[`${type}OU`] = selectedItem.ou;
    (this.transactionDetails as any)[`${type}L`] = selectedItem.l;
    (this.transactionDetails as any)[`${type}C`] = selectedItem.c;
  }
}

  columnDef_Buyer: ColDef[] = [
    { field: 'transactionId', headerName: 'clientRequestId', sortable: true, filter: true, flex: 1},
    { field: 'billType', headerName: 'Product Type', sortable: true, filter: true, flex: 1 },
    { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1 },
    { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
    { field: 'sellerName', headerName: 'seller Name', sortable: true, filter: true,flex: 1
    },
    { field: 'buyerBankName', headerName: 'Buyer Bank Name', sortable: true, filter: true, flex: 1
    },
    { field: 'dueDate', headerName: 'Due Date', sortable: true, filter: true, flex: 1},
    {
      field: 'transactionStatus',
      headerName: 'Approval Pending',
      flex: 1,
      cellRenderer: (params: any) => `<button class="red-btn">Approval Pending</button>`,
      onCellClicked: (params: any) => this.openPopup(params.data, params.api)
    }
  ];
  mapTransactionBuyerResponse(response: any[]): any[] {
    console.log("this.transactionResultGrid.json",response);
    if (!response || response.length === 0) {
      return [];
    }
  
    return response.map(item => ({
      transactionId: item.id,
      billType: 'Documentary Collection',
      amount: item.amount,
      currency: item.currency,
      sellerName: this.extractCN(item.drawer),
      buyerBankName: this.extractCN(item.drawee),
      // buyer: this.extractCN(item.payee),
      // issueDate: item.issueDate ? new Date(item.issueDate * 1000).toLocaleDateString() : '',
      dueDate: item.dueDate ? new Date(item.dueDate * 1000).toLocaleDateString() : '',
      avalisation: 'Yes'
    }));
  }

  selectedTransaction: any = null;
  showPopup: boolean = false;

  openPopup(transaction: any, gridApi: any) {
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


  approveTransaction(status: string) {
    if (this.selectedTransaction) {
      console.log("this.selectedTransaction",this.selectedTransaction);
      this.selectedTransaction.transactionStatus = status;
       const request: IOUAcceptance = {
        //hard code after backend run
            clientRequestId: `REQ1741092188009`,
            flowClassName: "com.r3.developers.samples.obligation.workflows.IOUAcceptFlow",
            requestBody: {
                payeeAcceptance: true,
                iouID: this.selectedTransaction.id
            }
        };
      this.transactionService.getStatusRequest(request).subscribe(
        (response: any) => {
          // Directly display the response object
          // alert(`Transaction Details: ${response}`);
          console.log("response",response);
        },
        (error: { message: any; }) => {
          alert(`Error: ${error.message}`)});

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
