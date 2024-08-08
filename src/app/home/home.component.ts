import { Component } from '@angular/core';

import { FooterComponent } from "../Layout/footer/footer.component";

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
