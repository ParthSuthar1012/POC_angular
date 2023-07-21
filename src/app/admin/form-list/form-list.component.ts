import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from 'src/app/service/service.service';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  constructor(private service:ServiceService){}
  
  @ViewChild(MatPaginator)
  paginator: MatPaginator | any; 

  dataSource:any
  displayedColumns: string[] = ['formId', 'formName', 'Action']
  ngOnInit(): void {
    this.getall()
   
  }

  getall(){
    console.log("hello!")
    this.service.getAllForms().subscribe(res=>{
      console.log(res)
      this.dataSource = res;
    
    })
  }

  
}
