import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';
@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.css'],
})
export class ListMusicComponent implements OnInit, OnDestroy {
  title = '';
  bannerImageUrl = '';
  bannerTexto = '';
  subs: Subscription[] = [];
  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  constructor(
    private activeRouter: ActivatedRoute,
    private SpotifyServer: SpotifyService,
    private playerService: PlayerService
  ) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }
  obterMusicas() {
    const sub = this.activeRouter.paramMap.subscribe(async (params) => {
      const tipo = params.get('tipo');
      const id = params.get('id');
      await this.obterDadosPagina(tipo, id);
    });

    this.subs.push(sub);
  }


  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }
  async obterDadosPagina(tipo: string, id: string) {
    if (tipo === 'playlist') await this.obterDadosPlaylist(id);
    else await this.obterDadosArtista(id);
  }
  async obterDadosPlaylist(playlistId: string) {
    const playlistMusicas = await this.SpotifyServer.buscarMusicasPlaylist(
      playlistId
    );
    this.definirDadosPagina(
      playlistMusicas.name,
      playlistMusicas.imagemUrl,
      playlistMusicas.musicas
    );
    this.title = 'Musicas Playlist: ' + playlistMusicas.name;
  }

  async obterDadosArtista(artistaId: string) {}

  definirDadosPagina(
    bannerTexto: string,
    bannerImage: string,
    musicas: IMusica[]
  ) {
    this.bannerImageUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }
  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.name).join(', ');
  }
  async executarMusica(musica: IMusica) {
    await this.SpotifyServer.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }
}
