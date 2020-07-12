import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PetListPageRoutingModule } from './pet-list-routing.module';

import { PetListPage } from './pet-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetListPageRoutingModule
  ],
  declarations: [PetListPage]
})
export class PetListPageModule {}
