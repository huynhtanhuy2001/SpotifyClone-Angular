import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayerComponent } from './pages/player/player.component';
import { PanelEsquerdoComponent } from './Components/panel-esquerdo/panel-esquerdo.component';
import { ButtonComponent } from './Components/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutComponent } from './Components/logout/logout.component';
import { LikesComponent } from './pages/likes/likes.component';
import { HomeComponent } from './pages/home/home.component';
import { TopArtistaComponent } from './Components/top-artista/top-artista.component';
import { PainelEsquerdoComponent } from './Components/painel-esquerdo/painel-esquerdo.component';
import { CategoryComponent } from './pages/category/category.component';
import { PlayerCardComponent } from './Components/player-card/player-card.component';
import { NavComponent } from './Components/nav/nav.component';
import { ListMusicComponent } from './pages/list-music/list-music.component';
import { BanerComponent } from './Components/baner/baner.component';
import { ChartsComponent } from './pages/charts/charts.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayerComponent,
    PanelEsquerdoComponent,
    ButtonComponent,
    LogoutComponent,
    LikesComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelEsquerdoComponent,
    CategoryComponent,
    PlayerCardComponent,
    NavComponent,
    ListMusicComponent,
    BanerComponent,
    ChartsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
