import { IArtistas } from '../interfaces/IArtistas';
import { IMusica } from '../interfaces/IMusica';
import { IPlaylist } from '../interfaces/IPlaylist';

export function newArtistas(): IArtistas {
  return {
    id: '',
    imagemUrl: '',
    name: '',
    musicas: [],
  };
}

export function newMusica(): IMusica {
  return {
    id: '',
    album: {
      id: '',
      imagemUrl: '',
      name: '',
    },
    artistas: [],
    tempo: '',
    titulo: '',
  };
}
export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imagemUrl: '',
    name: '',
    musicas: [],
  };
}
