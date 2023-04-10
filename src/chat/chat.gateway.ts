import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { AuthService } from "../auth/auth.service";

@WebSocketGateway({
  pingTimeout: 60000,
})

export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor(private readonly authService: AuthService) {
  }

  @SubscribeMessage('join')
  async joinRoom(data: {token:string}) {
    const userId = await this.authService.getVerifiedUserId(data.token)
    console.log(userId);
  }

}