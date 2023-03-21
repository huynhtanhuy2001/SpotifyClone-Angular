import { Component,OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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
