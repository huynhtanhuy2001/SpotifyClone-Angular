import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];
  constructor(
    private playerService: PlayerService,
    private spotifyService: SpotifyService
  ) {}
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
    this.clickAddCategory();
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas);
  }
  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.name).join(', ');
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }
  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }
 clickAddCategory(){
 this.spotifyService.addCategory()
  }
}
