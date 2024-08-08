import { Component, OnInit } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ApiService } from '../../Api/api.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { SharedapiService } from '../../Api/sharedapi.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PaginationModule ,HttpClientJsonpModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  users: any[] = [];
  bigTotalItems: number = 0; // total number of items
  bigCurrentPage: number = 1;  // current page
  maxSize: number = 5;         // max number of pages to show

  constructor(private apiService: ApiService,  private sharedPaginationService: SharedapiService) {}

  ngOnInit(): void {
    this.loadUsers(this.bigCurrentPage);
  }

  loadUsers(page: number): void {
    this.apiService.getUsers(page).subscribe(
      (data) => {
        if (data) {
          this.users = data.data;
          this.bigTotalItems = data.total;
          
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onPageChanged(event: any): void {
    this.bigCurrentPage = event.page;
    this.sharedPaginationService.setCurrentPage(this.bigCurrentPage);
    this.loadUsers(this.bigCurrentPage);
  }
}
