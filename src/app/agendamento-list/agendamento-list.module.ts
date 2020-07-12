import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoListPageRoutingModule } from './agendamento-list-routing.module';

import { AgendamentoListPage } from './agendamento-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentoListPageRoutingModule
  ],
  declarations: [AgendamentoListPage]
})
export class AgendamentoListPageModule {}
