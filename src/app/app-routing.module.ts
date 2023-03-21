import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from './guard/autenticado.guard';
import { LoginComponent } from './pages/login/login.component';
import { PlayerComponent } from './pages/player/player.component';
import { PanelEsquerdoComponent } from './Components/panel-esquerdo/panel-esquerdo.component';
import { LikesComponent } from './pages/likes/likes.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { ListMusicComponent } from './pages/list-music/list-music.component';
import { ChartsComponent } from './pages/charts/charts.component';

const routes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  {
    path: 'player',
    component: PlayerComponent,
    canActivate: [AutenticadoGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },{
        path:'listmusic/:tipo/:id', component :ListMusicComponent
      }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'like', component: LikesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
