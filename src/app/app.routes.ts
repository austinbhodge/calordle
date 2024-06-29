import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'play', component: PlayComponent}
];
