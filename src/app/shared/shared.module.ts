import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SharedDeclaredModules } from './shared-declared-modules';
import { SharedImportedModules } from './shared.imported-modules';

@NgModule({
  imports: [
    CustomMaterialModule,
    RouterModule,
    HttpClientModule,
    ...SharedImportedModules,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [...SharedDeclaredModules],
  exports: [
    CustomMaterialModule,
    ...SharedImportedModules,
    ...SharedDeclaredModules,
  ],
  providers: [],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
