import { NgFor } from '@angular/common';
import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import here
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../Api/api.service';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatCardModule, MatButtonModule,NgFor ,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  user: any; // Variable to store user data
  isLoading = true; // Loading state

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const userId = idParam ? +idParam : null; // Convert to number if not null
      if (userId) {
        this.fetchUserDetails(userId);
      }
    });
  }
  

  fetchUserDetails(id: number): void {
    this.apiService.getOneUser(id).subscribe(
      data => {
        this.user = data.data; // Store user data
        this.isLoading = false; // Set loading state to false
        
      },
      error => {
        console.error('Error fetching user details:', error);
        this.isLoading = false; // Set loading state to false on error
      }
    );
  }
}
