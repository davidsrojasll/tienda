import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ProductsModule } from "src/products/products.module";

@Module({
    imports: [ProductsModule],
    controllers: [ChatController],
    providers: [ChatService]
})
export class ChatModule {}