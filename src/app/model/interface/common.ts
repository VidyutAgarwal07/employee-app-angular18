export interface IParentDept {
    departmentId: number;
    departmentName: string;
    departmentLogo: string;
}
// export interface IChildDept {
//     childDeptId: number;
//     departmentName: string;
//     parentDeptId: number;
// }

export interface IloginInterface {
    username: string,
    password: string,
}

export interface IEmployee {
    employeeId: number
    employeeName: string
    contactNo: string
    emailId: string
    deptId: number
    password: string
    gender: string
    role: string
    createdDate: string
}

export interface IApiResponse {
    message: string;
    result: boolean;
    data: any;
}

// export interface IProjectEmployee {
//     empProjectId: number;
//     projectId: number;
//     empId: number;
//     assignedDate: string;
//     role: string;
//     isActive: string;
//     projectName: string;
//     employeeName: string;
// }

// export interface IProject {
//     projectId: number
//     projectName: string
//     clientName: string
//     startDate: string
//     leadByEmpId: number
//     contactPerson: string
//     contactNo: string
//     emailId: string
//     employeeName: string;
// }

