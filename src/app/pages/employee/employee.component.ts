import { Component, inject, OnInit, signal } from '@angular/core';
import { IApiResponse, IEmployee, IParentDept } from '../../model/interface/common';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isFormVisible = signal<boolean>(false);
  isEmployeeDetails = signal<boolean>(false);
  empList = signal<IEmployee[]>([]);
  empObj: Employee = new Employee()
  masterSrv = inject(MasterService);
  parentDeptList = signal<IParentDept[]>([]);

  ngOnInit(): void {
    this.getParentDept();
    this.getEmpList();
  }

  getParentDept(): any {
    this.masterSrv.getAllDept().subscribe({
      next: (res: IApiResponse) => {
        this.parentDeptList.set(res.data)
      },
      error(err) {
        console.error(err);
        alert(`Exception while getting parent dept: ${JSON.stringify(err)}`);
      },
      complete: () => console.info("Get Parent Department List Successful")
    })
  }

  addEmployee() {
    this.masterSrv.saveEmployee(this.empObj).subscribe({
      next: (res: IEmployee[]) => {
        alert(`Employee Created: ${JSON.stringify(res)}`);
        this.getEmpList();
        this.empObj = new Employee();
      },
      error(err) {
        alert(`Exception while creating employee: ${JSON.stringify(err.message)}`);
        console.error(err);
      },
      complete() {
        console.info("Employee Created Successfully")
      },
    })
  }

  getEmpList() {
    this.masterSrv.getEmpList().subscribe({
      next: (Res: IEmployee[]) => {
        this.empList.set(Res);
      },
      error: (err: any) => {
        alert(`Exception while fetching employee list: ${JSON.stringify(err.message)}`);
        console.error(err);
      },
      complete: () => console.info("Get Employee List Successful")
    });
  }

  onEdit(employeeData: Employee): void {
    // Set below values for update operations
    this.empObj = employeeData;
    this.isFormVisible.set(true);
  }

  updateEmployee() {
    // Logic for update operations
    this.masterSrv.updateEmployee(this.empObj).subscribe({
      next: (res: IApiResponse) => {
        alert(`${this.empObj.employeeId} employee updated succesfully`);
        this.getEmpList();
        this.empObj = new Employee();
      },
      error: (err: Error) => {
        console.log("Exception while updating employee", err);
        alert(`Exception while updating employeeId: ${this.empObj.employeeId} with error: ${JSON.stringify(err.message)}`);
      },
      complete: () => {
        console.info("Employee updated succesfully");
      },
    })
  }

  onDelete(employeeId: number) {
    let isDelete = confirm("Are you sure you want to delete this employee");
    if (isDelete) {
      this.masterSrv.deleteEmployee(employeeId).subscribe({
        next: (res: IApiResponse) => {
          alert(`${employeeId} employee deleted succesfully`);
          this.getEmpList();
          this.empObj = new Employee();
        },
        error: (err: Error) => {
          console.log("Exception while deleting employee", err);
          alert(`Exception while deleting employeeId: ${employeeId} with error: ${JSON.stringify(err.message)}`);
        },
        complete: () => {
          console.info("Employee deleted succesfully");
        },
      })
    }
  }
}
