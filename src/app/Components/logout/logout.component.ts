import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';

import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  usuario: IUsuario = {
    id: '1',
    name: 'Huỳnh Tấn Huy ',
    imagemUrl:'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  };

  constructor(private SpotifyService: SpotifyService) {}
  ngOnInit(): void {
    // this.usuario = this.SpotifyService.usuario;
  }
  logout() {
    this.SpotifyService.logout();
  }
}
