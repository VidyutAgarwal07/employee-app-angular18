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

