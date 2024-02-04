import {Gender} from "../enums/gender";
import {ContractType} from "../enums/contractType";

export class Employee {
    id:number;
    number:string;
    name:string;
    gender: Gender;
    job_position:string;
    phone:string;
    contract_type :ContractType;
    cnss_registration_number :string;
}
