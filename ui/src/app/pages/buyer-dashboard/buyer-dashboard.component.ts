import { Component } from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [
    AgGridAngular,
    CommonModule
  ],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent {
  userRole: string = 'Buyer';
  rowData: any[] = [
    { id: 1, amount: 5000, receiverBank: 'ABC Bank', currency: 'USD', draweeCN: 'XYZ Imports', drawerCN: 'LMN Ltd', payeeCN: 'PQR Corp', transactionStatus: 'Pending' }
  ];

  columnDefs: ColDef[] = [
    { field: 'amount', headerName: 'Amount', sortable: true, filter: true, flex: 1 },
    { field: 'receiverBank', headerName: 'Receiver Bank', sortable: true, filter: true, flex: 1 },
    { field: 'currency', headerName: 'Currency', sortable: true, filter: true, flex: 1 },
    { field: 'draweeCN', headerName: 'Drawee CN', sortable: true, filter: true, flex: 1 },
    { field: 'drawerCN', headerName: 'Drawer CN', sortable: true, filter: true, flex: 1 },
    { field: 'payeeCN', headerName: 'Payee CN', sortable: true, filter: true, flex: 1 },
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
