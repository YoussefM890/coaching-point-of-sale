import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../services/users.service";
import {Login} from "../models/classes/login";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
    imports: [
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        RouterLink,
        MatIconModule,
        TranslateModule
    ],
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: Login;
  hide: boolean;

  @ViewChild('logForm') loginFormDirective;
  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private router: Router,
              // public toastr: ToastrService
  ) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.createForm();
  }

  formErrors = {
    username: '',
    password: '',
  };

  validationMessages = {
    username: {
      required: 'mail est obligatoire',
      email: 'Format du mail invalide',
    },
    password: {
      required: 'Mot de passe obligatoire',
    },
  };

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.touched && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  changePasswordVisibility() {
    this.hide = !this.hide;
  }

  login() {
    this.router.navigate(['/employees']);
    return;
  //   this.form = this.loginForm.value;
  //   this.userService.login(this.form).subscribe(
  //     (res: any) => {
  //       if (res.status === 200) {
  //         localStorage.setItem('token', res.access_token);
  //         this.router.navigate(['/users']); //to edit: change to companies once companies gets implemented
  //       } else {
  //         // this.toastr.error(res.message);
  //       }
  //     },
  //     (err) => {
  //       // this.toastr.error(err.error.message);
  //     }
  //   );
  }
}
