import { Component, OnInit, OnDestroy } from '@angular/core';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  musica: IMusica = newMusica();
  subs: Subscription[] = [];
  constructor(private playerServer: PlayerService) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {}
  obterMusicaTocando() {
    const sub = this.playerServer.musicaAtual.subscribe((musica) => {
      this.musica = musica;
      console.log(this.musica);
    });

    this.subs.push(sub);
  }
  voltarMusica() {
    this.playerServer.voltarMusica();
  }

  proximaMusica() {
    this.playerServer.proximaMusica();
  }

}
