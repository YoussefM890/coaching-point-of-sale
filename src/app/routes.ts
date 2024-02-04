import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StockComponent} from "./stock/stock.component";
import {StockProductsComponent} from "./stock/stock-products/stock-products.component";
import {OrdersComponent} from "./orders/orders.component";
import {SessionsComponent} from "./sessions/sessions.component";
import {EmployeeDetailsComponent} from "./employees/employee-details/employee-details.component";
import {SessionComponent} from "./session/session.component";
import {NavComponent} from "./nav/nav.component";
import {LoyaltyDiscountComponent} from "./loyalty-discount/loyalty-discount.component";
import {CustomersComponent} from "./customers/customers.component";

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: NavComponent,
    children: [
      {path: 'employees', component: EmployeeDetailsComponent},
      {path: 'stock', component: StockComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'sessions', component: SessionsComponent},
      {path: 'loyalty', component: LoyaltyDiscountComponent},
      {path: 'customers', component: CustomersComponent},
    ]
  },
  {path: 'session', component: SessionComponent},
  {path: 'login', component: LoginComponent},

  // { path: 'employee/:id', component: EmployeeDetailsComponent },
  // { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuardGuard], data: { permittedRoles: ['Admin'] }},
  // { path: 'confirmAccount', component: ConfirmAccountComponent },
  // { path: 'emailSent', component: EmailSentComponent },
  // { path: 'resetPassword', component: ResetPasswordComponent },
  // { path: 'companies', component : CompaniesComponent, canActivate: [AuthenticationGuardGuard], data: { permittedRoles: ['Admin'] }},
  // { path: 'configuration', component : ConfigurationComponent, canActivate: [AuthenticationGuardGuard], data: { permittedRoles: ['Admin'] }},
  // { path: 'employees', component : EmployeesComponent},
  // { path: 'company/:id', component: CompanyDetailComponent },
  // { path: 'suppHoursRanges', component : SuppHoursRangeComponent},
  // { path : 'primes', component : PrimesComponent},
  // { path: '**', component: NotFoundComponent },
];
