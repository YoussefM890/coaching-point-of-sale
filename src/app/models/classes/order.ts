import {OrderLine} from "./orderLine";

export class Order {
  order_ref: number;
  session_id: number;
  pricelist_id: number;
  pricelist?: string;
  date: Date;
  receipt_number: string;
  employee_id: number;
  customer_id: number;
  employee_name?: string;
  customer_name?: string;
  total: number;
  total_after_discount?: number;
  lines?: OrderLine[];
}

//TODO : add customer id
