import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'pet-list',
    loadChildren: () => import('./pet-list/pet-list.module').then( m => m.PetListPageModule)
  },
  {
    path: 'cliente-list',
    loadChildren: () => import('./cliente-list/cliente-list.module').then( m => m.ClienteListPageModule)
  },
  {
    path: 'funcionario-list',
    loadChildren: () => import('./funcionario-list/funcionario-list.module').then( m => m.FuncionarioListPageModule)
  },
  {
    path: 'servico-list',
    loadChildren: () => import('./servico-list/servico-list.module').then( m => m.ServicoListPageModule)
  },
  {
    path: 'agendamento-list',
    loadChildren: () => import('./agendamento-list/agendamento-list.module').then( m => m.AgendamentoListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
