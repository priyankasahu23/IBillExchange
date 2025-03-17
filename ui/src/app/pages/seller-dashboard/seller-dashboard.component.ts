import {Component, Renderer2} from '@angular/core';
import {ClientSideRowModelModule, GridApi, Module} from 'ag-grid-community';
import {TransactionDetails} from '../../model/transaction-details';
import {TransactionDetailsGrid} from '../../model/transaction-details-result';
import {FormGroup, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TransactionService} from '../../service/transaction.service';
import {HttpClient} from '@angular/common/http';
import {TransactionStatus} from '../../model/transaction-status';
import {BexTransactionRequest, RequestBody} from '../../model/bexRequest';
import {AgGridAngular} from 'ag-grid-angular';
import {NgForOf, NgIf} from '@angular/common';
import {TransactionFormComponent} from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-seller-dashboard',
  imports: [
    FormsModule,
    AgGridAngular,
    TransactionFormComponent,
    NgIf
  ],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {

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
  private flowClassName: string = 'com.r3.developers.samples.obligation.workflows.IOUIssueFlow';
  selectedSubType = '';
  sellerList = [
    { cn: 'LBG Bank', ou: "Banking Dept",o: 'Lloyds Banking Group', l: 'London', c: 'GB' },
    { cn: 'Barclays', o: 'Barclays UK', l: 'London', c: 'UK' },
    { cn: 'Royal Bank of Scotland', o: 'Royal Bank of Scotland', l: 'ScotLand', c: 'UK' },
    { cn: 'NatWest', o: 'NatWest', l: 'London', c: 'UK' }
  ]
  cnList = [
    { cn: 'ABC Imports', ou: "Imports Dept",o: 'ABC Imports', l: 'India', c: 'IN' },
    { cn: 'Global Exports', ou: "Exports Dept",o: 'Global Exports', l: 'London', c: 'GB' },
    { cn: 'ICICI Bank', ou: "Banking Dept",o: 'ICICI Bank', l: 'India', c: 'IN' },
    { cn: 'RBI Bank', ou: "Banking Dept",o: 'Reserve Bank of India', l: 'India', c: 'IN' },
    { cn: 'LBG Bank', ou: "Banking Dept",o: 'Lloyds Banking Group', l: 'London', c: 'GB' },
  ];
  subTypes : string[] =['Discounting Bill of Exchange','Usance Bill of Exchange','Negotiable Bill of Exchange'
  ];
  currencyList: string[] = ['INR','EUR','USD','GBP'];
  billTypeList: string[] =['Letter of Credit(LC)','Purchase Order(PO) Finanace','Supply Chain Finance(SCF)',
    'Trade Credit','Receivable Financing','Bill of Exchange','Bank Guarantees','Export and Import Loans'] ;
  private gridApi!: GridApi;


  constructor(private transactionService: TransactionService, private http: HttpClient, private router: Router) {
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
      { field: 'subProductType', headerName: 'Sub Product Type', sortable: true, filter: true, flex: 1.5 },
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
          if(this.userRole == 'Seller'){
            console.log("In userRole......",this.userRole)
            this.rowData = this.mapTransactionResponse(this.transactionResultGrid.json);
            console.log("Seller this.rowData",this.rowData);
          }
          // else if(this.userRole == 'Buyer'){
          //   this.rowData = this.mapTransactionBuyerResponse(this.transactionResultGrid.json);
          // }

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
    console.log("In mapTransactionResponse response",response);
    return response.map(item => ({
      id: item.id,
      billType: 'Bill of Exchange',
      subProductType: 'Usance Bill of Exchange',
      amount: item.amount,
      currency: item.currency,
      buyerBank: this.extractCN(item.drawee),
      buyer: this.extractCN(item.payee),
      // issueDate: item.issueDate ? new Date(item.issueDate * 1000).toLocaleDateString() : '',
      dueDate: item.dueDate ? new Date(item.dueDate * 1000).toLocaleDateString() : '',
      avalisation: 'Yes'
    }));
  }

  openForm() {
    this.isFormOpen = true;
    console.log("this.isFormOpen",this.isFormOpen);
    this.router.navigate(['transaction-form']);
  }

  closeForm() {
    this.isFormOpen = false;
    this.transactionDetails = new TransactionDetails(
      '','',0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','','','','',''
    );
  }

  onGridReady(params: any) {
    params.api.autoSizeColumns();
    this.gridApi = params.api;
    this.getTransactionResult();
  }

  submitForm() {
    if (this.transactionDetails.amount> 0) {
      this.transactionDetails.clientRequestId =  this.generateClientRequestId();
      const bexRequest = this.mapTransactionToBexRequest(this.transactionDetails);
      console.log("this.transactionDetails",this.transactionDetails);
      console.log("bexRequest",bexRequest);
      // const newEntry = this.mapTransactionToBexRequest(this.transactionDetails); // TODO:

      // ✅ Update the array using a new reference to trigger change detection
      // this.rowData = [...this.rowData, newEntry];
      this.initiateTransaction(bexRequest);
      this.getTransactionResult();
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
      this.formatEntity('Global Exports', 'Exports Dept' ,'Global Exports', 'London', 'GB'),
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

  onProductTypeChange(event: any) {
    const selectedType = event.target.value;
    console.log("selectedType",selectedType);
    // this.subTypes = this.subTypeMapping[selectedType] || [];
    this.selectedSubType = '';
  }

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

  handleFileUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log("Selected file:", file.name);
      // You can process the file here (e.g., upload it)
    }
  }

}
