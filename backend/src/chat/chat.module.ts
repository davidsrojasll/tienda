import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ProductsModule } from "src/products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./message.entity";

@Module({
    imports: [ProductsModule,
        TypeOrmModule.forFeature([Message]),
    ],
    controllers: [ChatController],
    providers: [ChatService]
})
export class ChatModule {}