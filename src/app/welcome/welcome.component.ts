import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mr-welcome',
  template: `
<div class="container">
  <div class="welcome">
  <div class="container">
    <div class="welcome-caption">
      <h1></h1>
    <h2>WELCOME TO THE RED PLANET</h2>
    <h4>Have a sneak peak of what the rovers have recorded over the years.</h4>
  </div>
</div>
</div>
</div>
  `,
  styles: [
  ]
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
