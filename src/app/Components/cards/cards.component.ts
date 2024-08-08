import { NgFor } from '@angular/common';
import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,NgFor],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  @Input() users: any[] = [];

  constructor(private router: Router) {}

  viewUser(id: number): void {
    this.router.navigate(['/details', id]);
  }
}

