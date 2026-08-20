import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { Message } from './message.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async reply(message: string) {
    const text = message.toLowerCase().trim();
    let replyText = '';

    // 1. Saludo
    if (text.includes('hola') || text.includes('buenas')) {
      replyText =
        '¡Hola! Soy el asistente de la tienda. Pregúntame por "productos", precios, envíos u horarios.';
    }
    // 2. Envío
    else if (
      text.includes('envio') ||
      text.includes('envío') ||
      text.includes('delivery') ||
      text.includes('entrega')
    ) {
      replyText =
        'Envíos a todo el país. Gratis en compras mayores a $50. Entrega en 3-5 días hábiles.';
    }
    // 3. Horario
    else if (
      text.includes('horario') ||
      text.includes('hora') ||
      text.includes('abren') ||
      text.includes('abierto')
    ) {
      replyText =
        'Nuestro horario es de lunes a viernes, 9:00 a.m. a 6:00 p.m. Sábados de 9:00 a.m. a 1:00 p.m.';
    }
    // 4. Contacto
    else if (
      text.includes('contacto') ||
      text.includes('contactar') ||
      text.includes('email') ||
      text.includes('correo') ||
      text.includes('telefono') ||
      text.includes('teléfono')
    ) {
      replyText =
        'Puedes contactarnos en: tienda@email.com o WhatsApp: +57 300 123 4567.';
    }
    // 5. Productos, precios y búsqueda
    else {
      const products = await this.productsService.findAll();

      if (
        text.includes('producto') ||
        text.includes('catalogo') ||
        text.includes('catálogo')
      ) {
        if (products.length === 0) {
          replyText = 'No hay productos disponibles por ahora.';
        } else {
          const list = products
            .map((p) => `• ${p.name}: $${p.price}`)
            .join('\n');
          replyText = `Estos son nuestros productos:\n${list}`;
        }
      } else {
        const found = products.find((p) => {
          const name = p.name.toLowerCase();
          return (
            text.includes(name) ||
            name.split(' ').some((word) => word.length > 3 && text.includes(word))
          );
        });

        if (found) {
          replyText = `${found.name} cuesta $${found.price}. ¿Te gustaría saber de otro producto?`;
        } else if (text.includes('precio') || text.includes('cuesta')) {
          replyText =
            'Dime el nombre del producto, por ejemplo: "precio camiseta" o "cuánto cuesta el jean".';
        } else {
          replyText =
            'No entendí tu pregunta. Prueba con: "hola", "productos", "envío", "horario" o "precio camiseta".';
        }
      }
    }

    // Guardar conversación en MySQL
    await this.messagesRepository.save({
      userMessage: message,
      botReply: replyText,
    });

    return { reply: replyText };
  }
}
