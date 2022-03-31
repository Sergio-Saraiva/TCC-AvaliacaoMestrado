import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModules } from './material-module';

@NgModule({
  imports: [...MaterialModules],
  exports: [...MaterialModules],
  providers: [],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomMaterialModule {
  static forRoot() {
    return {
      ngModule: CustomMaterialModule,
      providers: [],
    };
  }
}
