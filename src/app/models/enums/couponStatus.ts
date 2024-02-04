export enum CouponStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export const couponStatuses = [
  {
    value: CouponStatus.Active,
    viewValue: 'active',
  },
  {
    value: CouponStatus.Inactive,
    viewValue: 'inactive',
  },
];
