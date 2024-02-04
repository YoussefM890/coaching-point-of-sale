import {BaseFilter} from "./baseFilter";

export class PaginationFilter extends BaseFilter{
    page_size: number;
    page_number: number;

    constructor() {
        super();
        this.pagination_fields = this.pagination_fields.concat([
            'page_number',
            'page_size',
        ]);
        this.page_number = 1;
        this.page_size = 5;
    }
}
