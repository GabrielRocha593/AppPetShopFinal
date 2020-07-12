import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicoListPageRoutingModule } from './servico-list-routing.module';

import { ServicoListPage } from './servico-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicoListPageRoutingModule
  ],
  declarations: [ServicoListPage]
})
export class ServicoListPageModule {}
