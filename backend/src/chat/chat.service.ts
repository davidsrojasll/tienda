import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
  reply(message: string) {
    return {
      reply: `Recibí tu mensaje: "${message}". Pronto responderé con inteligencia :)`,
    };
  }
}