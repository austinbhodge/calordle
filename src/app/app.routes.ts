import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TodayComponent } from './pages/today/today.component';

export const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'today', component: TodayComponent}
];
