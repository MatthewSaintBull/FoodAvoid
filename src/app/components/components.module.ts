import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LogoComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
    ],
  exports: [LogoComponent]
})
export class ComponentsModule { }
