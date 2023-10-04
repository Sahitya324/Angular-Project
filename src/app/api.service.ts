import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { templateModel } from './template-list/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

addTemplate(data:templateModel){
  return this.http.post<templateModel>("http://localhost:3000/templates", data)
}

getTemplate(){
  return this.http.get<templateModel[]>("http://localhost:3000/templates")
}

deleteTemplate(id:number) {
  return this.http.delete<templateModel[]>("http://localhost:3000/templates/"+id);
}

fetchTemplateDetail(id:number) {
  return this.http.get<templateModel[]>("http://localhost:3000/templates/"+id);
}
}
