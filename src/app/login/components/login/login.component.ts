import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      console.log(`aqui`);
      this.router.navigate(['/home']);
    }
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    this.loginService
      .signIn({
        email: this.formGroup.controls.email.value,
        password: this.formGroup.controls.password.value,
      })
      .subscribe(
        (data) => this.afterLoginSuccess(data),
        (err) => this.afterLoginError(err)
      );
  }

  afterLoginSuccess(data: any) {
    this.loginService.saveToken(data);
    this._snackBar.open('Login efetuado com sucesso', 'X', { duration: 3000 });
    this.router.navigate(['/home']);
  }

  afterLoginError(err: any) {
    this._snackBar.open('Erro ao efetuar login', 'X', { duration: 3000 });
  }
}
