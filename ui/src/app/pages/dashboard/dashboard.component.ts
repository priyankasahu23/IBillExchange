import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {ClientSideRowModelModule, GridApi, Module} from 'ag-grid-community';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


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
  rowData: any[] = [];
  modules: Module[] = [ClientSideRowModelModule];

  transactionForm!: FormGroup;

  constructor(private router: Router, private renderer: Renderer2, private fb: FormBuilder) {
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
  }

  columnDefs = [
    { field: 'amount', headerName: 'Amount' },
    { field: 'billType', headerName: 'Bill Type' },
    {field: 'receiverBank', headerName: 'Receiver Bank'},
    {field: 'transactionStatus', headerName:'Transaction Status'}
  ];

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.amount = 0;
    this.billType = '';
    this.receiverBank = '';
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  submitForm() {
    if (this.amount && this.billType) {
      const newEntry = { amount: this.amount, billType: this.billType, receiverBank: this.receiverBank, transactionStatus: this.transactionStatus };

      // ✅ Update the array using a new reference to trigger change detection
      this.rowData = [...this.rowData, newEntry];

      // Reset form
      this.closeForm();
    }

  }

}
