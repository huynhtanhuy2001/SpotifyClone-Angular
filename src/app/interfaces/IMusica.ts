export interface IMusica {
  id: string,
  titulo: string,
  artistas: {
    id: string,
    name: string
  }[],
  album: {
    id: string,
    name: string,
    imagemUrl: string
  },
  tempo: string
}
