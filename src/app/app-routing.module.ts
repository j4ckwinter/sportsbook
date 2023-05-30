import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sportsbook',
    loadChildren: () =>
      import('./sportsbook/sportsbook.module').then((m) => m.SportsbookModule),
  },
  {
    path: '',
    redirectTo: 'sportsbook',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
