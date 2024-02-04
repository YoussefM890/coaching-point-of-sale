import {CouponStatus} from "../enums/couponStatus";

export class Coupon {
  code : string;
  discount : number;
  status : CouponStatus;
  program_id : number;
}
