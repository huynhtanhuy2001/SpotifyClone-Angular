import { Component,OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  playlists: IUsuario[] = [];
  constructor(private spotifyService : SpotifyService){}
  ngOnInit(): void {
    this.buscarPlaylists()

  }

  async buscarPlaylists() {
    this.playlists = await this.spotifyService.bucarPlaylistUsuario();
    console.log(this.playlists);
  }

}
