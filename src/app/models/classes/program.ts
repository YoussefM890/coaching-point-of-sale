import {ProgramType} from "../enums/programType";
import {Coupon} from "./coupon";
import {BuyXGetY} from "./buyXGetY";

export class Program {
  id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  type: ProgramType;
  lines?: any[];
}
