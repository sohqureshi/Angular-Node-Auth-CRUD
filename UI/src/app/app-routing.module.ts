import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentAddComponent } from './moment/moment-add/moment-add.component';
import { MomentComponent } from './moment/moment.component';
import { AuthGuard } from './shared/helper/auth.guard';
import { RegisterComponent } from './user-pages/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'moment', pathMatch: 'full' },
  { path: 'login', component: RegisterComponent},
  { path: 'moment', component: MomentComponent, canActivate: [AuthGuard]},
  { path: 'moment/add', component: MomentAddComponent, canActivate: [AuthGuard]},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  // { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  // { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  // { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  // { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  // { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  // { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  // { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
