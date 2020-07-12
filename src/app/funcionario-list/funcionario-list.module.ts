import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionarioListPageRoutingModule } from './funcionario-list-routing.module';

import { FuncionarioListPage } from './funcionario-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuncionarioListPageRoutingModule
  ],
  declarations: [FuncionarioListPage]
})
export class FuncionarioListPageModule {}
