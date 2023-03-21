import { Component, OnInit } from '@angular/core';
import { newArtistas } from 'src/app/Common/factories';
import { IArtistas } from 'src/app/interfaces/IArtistas';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.css'],
})
export class TopArtistaComponent implements OnInit {


  topArtista: IArtistas = newArtistas();
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarArtistas();
  }
  async buscarArtistas() {
    const artistas = await this.spotifyService.bucarTopArtistas(1);
    if (!!artistas) {
      this.topArtista = artistas.pop();
    }

  }
}
