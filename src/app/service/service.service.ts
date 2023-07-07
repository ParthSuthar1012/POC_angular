import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
createurl : string = "http://10.11.10.128:7084/api/create"
getall : string = "http://10.11.10.128:7084/api/GetAll"
  constructor(public http:HttpClient) { }


  create(data:any) {
     return this.http.post(this.createurl , data);
  }

  getAll() {
    return this.http.get(this.getall);
  }
 }
