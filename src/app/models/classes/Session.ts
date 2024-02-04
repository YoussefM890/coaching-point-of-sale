import {SessionStatus} from "../enums/sessionStatus";
import {Order} from "./order";

export class Session {
    id: number;
    opened_by: number;
    opened_at: Date;
    closed_at: Date;
    status: SessionStatus;
    employee_name?: string;
    orders?: Order[];
}
