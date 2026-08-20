import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    reply(@Body() body: { message: string }) {
        return this.chatService.reply(body.message ?? '');
    }
}