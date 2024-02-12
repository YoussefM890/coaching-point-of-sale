import {CouponStatus} from "../enums/couponStatus";

export class Coupon {
  code : string;
  discount : number;
  status : CouponStatus;
  amount? : number;
  program_id : number;
}
