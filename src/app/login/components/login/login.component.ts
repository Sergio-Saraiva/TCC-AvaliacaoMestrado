import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {}
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(): void {
    this.loginService.create({email: this.formGroup.controls.email.value, password: this.formGroup.controls.password.value}).subscribe(data => console.log(data));
  }
}
