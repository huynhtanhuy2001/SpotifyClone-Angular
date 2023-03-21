import { IMusica } from './IMusica';

export interface IArtistas {
  id: string;
  name: string;
  imagemUrl: string;
  musicas?: IMusica[];

  // artistasT: IArtistas = {
  //   id: 'pedrohsscerqueira',
  //   name: 'Huỳnh Tấn Huy ',
  //   imagemUrl:
  //     'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // };
}
