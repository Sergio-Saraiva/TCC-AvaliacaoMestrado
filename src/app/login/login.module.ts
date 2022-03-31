import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeRoutingModule } from '../home/home.routing';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login.routing';


@NgModule({
  imports: [LoginRoutingModule, CommonModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
