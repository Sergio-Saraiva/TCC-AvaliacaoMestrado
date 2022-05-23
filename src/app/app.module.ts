import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationInterceptorSerice } from './shared/services/authentication-interceptor.service';
import { AnswersService } from './shared/services/answers.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule.forRoot(),
    SharedModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    SharedModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorSerice,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
