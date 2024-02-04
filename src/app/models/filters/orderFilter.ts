import {PaginationFilter} from "./paginationFilter";

export class OrderFilter extends PaginationFilter {
    orderRef?: number;
    sessionId?: number;
    date?: string;
    receiptNumber?: string;
    employee?: string;
    total?: number;
    constructor() {
        super();
        this.filter_fields = this.filter_fields.concat([
            'orderRef',
            'sessionId',
            'date',
            'receiptNumber',
            'employee',
            'total',
        ]);
    }
}
