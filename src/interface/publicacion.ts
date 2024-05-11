export interface Publicacion {
  publicacion_id?: number;
  usuario_id: number;
  titulo: string;
  sinopsis: string;
  contenido: string;
  c_like?: number;
  c_dislike?: number;
  c_comentario?: number;
}
