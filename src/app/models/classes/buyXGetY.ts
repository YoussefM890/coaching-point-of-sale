import {BuyXGetYStatus} from "../enums/buyXGetYStatus";

export class BuyXGetY {
  code: string;
  buy: number;
  get: number;
  buy_name? : string;
  get_name? : string;
  amount?: number;
  status:BuyXGetYStatus
  program_id: number;
}
