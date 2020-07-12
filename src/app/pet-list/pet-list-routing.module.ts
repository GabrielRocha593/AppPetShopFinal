import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetListPage } from './pet-list.page';

const routes: Routes = [
  {
    path: '',
    component: PetListPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastro/:id',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetListPageRoutingModule {}
