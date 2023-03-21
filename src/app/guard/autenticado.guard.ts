import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticadoGuard implements CanActivate {
  constructor(private router: Router, private spotifyService: SpotifyService) {
    this.router = router;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      return this.nauAutenticado();
    }
    return new Promise((res) => {
      const usuarioCriado = this.spotifyService.inicializarSuario();
      if (usuarioCriado) {
        res(true);
      } else {
        res(this.nauAutenticado());
      }
    });
    return true;
  }

  nauAutenticado() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
