import { Component, inject, OnInit, signal } from '@angular/core';
import { IApiResponse, IEmployee } from '../../model/interface/common';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isFormVisible = signal<boolean>(false);
  isEmployeeDetails = signal<boolean>(false);
  empList = signal<IEmployee[]>([]);

  masterSrv = inject(MasterService);

  ngOnInit(): void {
    this.getEmpList();
  }

  addEmployee() {
    this.isFormVisible.set(true);
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

  onEdit() {

  }

  onDelete(employee: IEmployee) {
    this.masterSrv.deleteEmployee(employee.employeeId).subscribe({
      next: (res: IApiResponse) => {
        alert(`${employee.employeeId} employee deleted succesfully`);
      },
      error: (err) => {
        console.log("Exception while deleting employee", err);
      },
      complete: () => {
        console.info("Employee deleted succesfully");
      },
    })
  }
}
