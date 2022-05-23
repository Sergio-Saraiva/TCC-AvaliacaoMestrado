import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginTypes } from 'src/app/shared/consts/login-types';
import { LoginResponseData } from 'src/app/shared/models/login-response-data';
import { LoginType } from 'src/app/shared/models/login-type';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  loginTypeOptions: LoginType[] = LoginTypes;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      console.log(`aqui`);
      this.router.navigate(['/home']);
    }
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      type: new FormControl('docente', [Validators.required]),
    });
  }

  login(): void {
    this.userService
      .signIn({
        email: this.formGroup.controls.email.value,
        password: this.formGroup.controls.password.value,
        type: this.formGroup.controls.type.value,
      })
      .subscribe(
        (data) =>
          this.afterLoginSuccess({
            ...data,
            type: this.formGroup.controls.type.value,
          } as LoginResponseData),
        (err) => this.afterLoginError(err)
      );
  }

  afterLoginSuccess(data: LoginResponseData) {
    this.userService.setUserInformation({
      email: data.email,
      name: data.name,
      id: data.id,
      type: data.type,
    });
    this.userService.saveToken(data.token);
    this._snackBar.open('Login efetuado com sucesso', 'X', { duration: 3000 });
    this.router.navigate(['/home']);
  }

  afterLoginError(err: any) {
    console.log(err);
    this._snackBar.open('Erro ao efetuar login', 'X', { duration: 3000 });
  }
}
