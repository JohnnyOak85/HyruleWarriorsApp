import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreditsComponent } from './credits/credits.component';

const routes: Routes = [
  {
    path: 'map/:id',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'credits',
    component: CreditsComponent,
  },
  {
    path: '',
    redirectTo: 'map/legend',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
