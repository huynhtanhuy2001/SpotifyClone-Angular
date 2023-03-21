import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../emvironments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaplaylist,
  SpotifySinglePlaylistParaPlaylist,
  SpotifyTrackParaMusica,
  SpotifyUserParaUsuario,
} from '../Common/spotifyHelp';
import { IPlaylist } from '../interfaces/IPlaylist';
import { __await } from 'tslib';
import { Router } from '@angular/router';
import { IArtistas } from '../interfaces/IArtistas';
import { async } from 'rxjs';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  usuario: IUsuario = {
    id: 'pedrohsscerqueira',
    name: 'Huỳnh Tấn Huy ',
    imagemUrl:
      'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  music: IMusica = {
    id: 'pedrohsscerqueira',
    titulo: '',
    artistas: [],
    album: {
      id: '',
      name: '',
      imagemUrl: '',
    },
    tempo: '',
  };
  private category: Array<string> = [];
  SpotifyApi: Spotify.SpotifyWebApiJs = null;
  constructor(private router: Router) {
    this.SpotifyApi = new Spotify();
  }

  async inicializarSuario() {
    if (!!this.usuario) {
      return true;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (ex) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.SpotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
    console.log(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }
  obterTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');

    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.SpotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async bucarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    //loi
    // const test = 'pedrohsscerqueira';
    const playlists = await this.SpotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistParaplaylist);
  }

  async bucarTopArtistas(limit = 10): Promise<IArtistas[]> {
    const artistas = await this.SpotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    let musicas = await this.SpotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map((x) => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string) {
    await this.SpotifyApi.queue(musicaId);
    await this.SpotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.SpotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musicaSpotify.item);
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.SpotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

    const musicasSpotify = await this.SpotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musicas = musicasSpotify.items.map(musica => SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull))

    return playlist;
  }

  addCategory() {
    this.category.push(this.music.id, this.music.titulo, this.music.album.id);
    console.log(this.category);
  }
  async voltarMusica() {
    await this.SpotifyApi.skipToPrevious();
  }
  async proximaMusica() {
    await this.SpotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
