import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home.routing';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, EvaluationFormComponent],
  exports: [HomeComponent, EvaluationFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
