import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../Components/cards/cards.component';
import { ApiService } from '../Api/api.service';
import { SharedapiService } from '../Api/sharedapi.service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../Layout/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this
import { MatInputModule } from '@angular/material/input'; // Add this


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, CardsComponent,NgFor,NgIf,MatProgressSpinnerModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  
})
export class UsersComponent implements OnInit  {
  title = 'Users';
  users: any[] = [];
  currentPage: number = 1;
  searchForm: FormGroup;
  isLoading = true; // Loading state
  constructor(
    private apiService: ApiService,
    private sharedPaginationService: SharedapiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.sharedPaginationService.currentPage$.subscribe(page => {
      this.currentPage = page;
      this.loadUsers(this.currentPage);
    });
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      if (!value) {
        // If the search input is empty, load all users
        this.loadUsers(this.currentPage);
      } else {
        this.searchUserById(value);
      }
    });
  }

  loadUsers(page: number): void {
    this.apiService.getUsers(page).subscribe(
      (data) => {
        if (data) {
          this.users = data.data;
          this.isLoading = false; // Set loading state to false
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  searchUserById(id: string): void {
    
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      console.error('Invalid ID:', id);
      return;
    }
  
    this.apiService.getOneUser(parsedId).subscribe(
      user => {
        if (user && user.data && user.data.id) {
          this.users = [user.data]; 
        // this.router.navigate(['/details', user.data.id]); // Navigate to user details page
        } else {
          console.log('User not found');
        }
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }

  viewUser(id: number): void {
    this.router.navigate(['/details', id]); // Navigate to user details page
  }
}
