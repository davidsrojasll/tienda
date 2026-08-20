import { Injectable } from "@nestjs/common";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class ChatService {
  constructor(private readonly productsService: ProductsService) { }

  async reply(message: string) {
    const text = message.toLowerCase().trim();

    // 1. Saludo
    if (text.includes('hola') || text.includes('buenas')) {
      return {
        reply:
          '¡Hola! Soy el asistente de la tienda. Pregúntame por "productos" o el precio de un artículo.',
      };
    }
    const products = await this.productsService.findAll();
    // 2. Listar productos
    if (
      text.includes('producto') ||
      text.includes('catalogo') ||
      text.includes('catálogo')
    ) {
      if (products.length === 0) {
        return { reply: 'No hay productos disponibles por ahora.' };
      }
      const list = products
        .map((p) => `• ${p.name}: $${p.price}`)
        .join('\n');
      return { reply: `Estos son nuestros productos:\n${list}` };
    }
    // 3. Buscar producto por nombre (ej: "camiseta", "jean")
    const found = products.find((p) => {
      const name = p.name.toLowerCase();
      return (
        text.includes(name) ||
        name.split(' ').some((word) => word.length > 3 && text.includes(word))
      );
    });
    if (found) {
      return {
        reply: `${found.name} cuesta $${found.price}. ¿Te gustaría saber de otro producto?`,
      };
    }
    // 4. Pregunta genérica de precio
    if (text.includes('precio') || text.includes('cuesta')) {
      return {
        reply:
          'Dime el nombre del producto, por ejemplo: "precio camiseta" o "cuánto cuesta el jean".',
      };
    }
    // 5. Respuesta por defecto
    return {
      reply:
        'No entendí tu pregunta. Prueba con: "hola", "productos", "camiseta" o "precio zapatillas".',
    };
  }
}