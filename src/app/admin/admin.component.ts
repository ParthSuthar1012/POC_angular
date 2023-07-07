import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  types: any = [
    {value: 'text'},
    {value: 'radio' },
    {value: 'password'},
    {value: 'email'},
    {value: 'checkbox'},
  ];
}
