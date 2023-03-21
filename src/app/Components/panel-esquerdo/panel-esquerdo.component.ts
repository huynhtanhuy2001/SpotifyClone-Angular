import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';
@Component({
  selector: 'app-panel-esquerdo',
  templateUrl: './panel-esquerdo.component.html',
  styleUrls: ['./panel-esquerdo.component.css'],
})
export class PanelEsquerdoComponent implements OnInit {
  menuSeleccionado = 'Home';
  playlists: IPlaylist[] = [];
  //icon
  filmIcon = faFilm;

  constructor(private spotifyService: SpotifyService, private router: Router) {}
  ngOnInit(): void {
    this.buscarPlaylists();
    this.router.navigateByUrl('player/home');
  }
  buttonClick(button: string) {
    this.menuSeleccionado = button;
  }
  irParaPlaylist(playlistId: string) {
    this.menuSeleccionado = playlistId;
    this.router.navigateByUrl(`player/listmusic/playlist/${playlistId}`);
  }

  async buscarPlaylists() {
    this.playlists = await this.spotifyService.bucarPlaylistUsuario();
  }
}
