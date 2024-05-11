import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { Usuario } from "./usuario";
import { Publicacion } from "./publicacion";
import { Like } from "./like";
import { Dislike } from "./dislike";
import { Comentario } from "./comentario";
import { Amigo } from "./amigo";
import { Chat } from "./chat";
import { Mensaje } from "./mensaje";
import { router } from "../routes";

class Server {
  private app: express.Application;
  private PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3001";
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutandose en el puerto ${this.PORT}`);
    });
  }

  middlewares() {
    this.app.use(express.json());
    // this.app.use(
    //   cors({
    //     origin: "http://localhost:4200",
    //     credentials: true,
    //   })
    // );
    this.app.use(
      cors({
        origin: [
          "",
          "https://gjwtnwmv-4200.brs.devtunnels.ms",
          "http://localhost:4200",
        ],
        credentials: true,
      })
    );
    // https://gjwtnwmv-4200.brs.devtunnels.ms/
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use(router);
  }

  async dbConnect() {
    try {
      await Usuario.sync();
      await Publicacion.sync();
      await Like.sync();
      await Dislike.sync();
      await Comentario.sync();
      await Amigo.sync();
      await Chat.sync();
      await Mensaje.sync();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Server;

// https://gjwtnwmv-3000.brs.devtunnels.ms/
// https://gjwtnwmv-4200.brs.devtunnels.ms/
