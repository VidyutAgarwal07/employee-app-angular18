import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, IEmployee } from '../model/interface/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private httpClient: HttpClient) { }

  url:string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  // EMPLOYEE SERVICE API CALLS
  getEmpList(): Observable<IEmployee[]>{
    return this.httpClient.get<IEmployee[]>(this.url+"GetAllEmployees");
  }

  saveEmployee(empData: IEmployee[]): Observable<IEmployee[]>{
    return this.httpClient.post<IEmployee[]>(this.url+"CreateEmployee", empData);
  }

  deleteEmployee(empId: number): Observable<IApiResponse>{
    return this.httpClient.delete<IApiResponse>(this.url+"DeleteEmployee/" + empId); //TODO: validate datatype any
  }

  updateEmployee(empData: IEmployee[], empId: number): Observable<IApiResponse>{
    return this.httpClient.put<IApiResponse>(this.url+"UpdateEmployee/" + empId, empData);  //TODO: validate datatype any
  }

  // PROJECT SERVICE API CALLS
  
}
