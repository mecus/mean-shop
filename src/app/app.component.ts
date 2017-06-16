import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <app-top-menu></app-top-menu>
    <sub-menu></sub-menu>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  { }
