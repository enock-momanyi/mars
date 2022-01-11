import { Component } from '@angular/core';

@Component({
  selector: 'mr-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  rovers = ['Opportunity', 'Curiosity', 'Spirit', 'Perseverance']
  title = 'mars rovers';
}
