import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [{
      path: 'inicio',
      loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
    },
    {
      path: 'perfil',
      loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
    },
    {
      path: 'asistencias',
      loadChildren: () => import('../asistencias/asistencias.module').then(m => m.AsistenciasPageModule)
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
