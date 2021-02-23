import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
//import * as io from 'socket.io-client';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stomp-client';

import { environment } from "src/environments/environment";
import { PersonSimplified } from "../models/person.simplified";
import { WebStorageService } from "../web-storage/webstorage.service";
import { Message } from "./chat-room-list/chat-room/message";

const API = environment.ApiUrl + '/request/api';
const CHAT_HTTP_ROUTE = '/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private friendName = new BehaviorSubject<string>("");
    sharedfriendNames = this.friendName.asObservable();

    constructor(
        private webStorageService: WebStorageService,
        private httpClient: HttpClient
    ) {
        this.connect();
    }

    private stompClient = null;

    connect(){
        //let ws = webSocket('ws://localhost:8080/ws');
        let ws = new SockJS("http://localhost:8080/ws");
        this.stompClient = Stomp.over(ws);

        this.stompClient.connect(
            {},
            onConnected => {
                console.log("connected");
                console.log('currentUser');
                this.stompClient.subscribe(
                  "/user/" + 5 + "/queue/messages",
                  this.onMessageReceived
                );
                this.stompClient.send(
                    "/user/" + 5 + "/queue/messages",
                    'message'
                );
              },
            err => {
                console.log('error: ' + err)
            }
        );
        
    }

    onMessageReceived(msg){
      console.log(msg);
    };

    nextFriendName(friendName: string) {
        this.friendName.next(friendName);
    }

    loadMessages(requesterId: string, friendId: string): Message[]{
        return [
            {
                chatId: requesterId + '_' + friendId,
                senderId: requesterId,
                recipientId: friendId,
                content: 'message',
                senderName: this.titleCase(requesterId),
                recipientName: this.titleCase(friendId),
                timestamp: new Date(),
                status: null
            },{
                chatId: requesterId + '_' + friendId,
                senderId: requesterId,
                recipientId: friendId,
                content: 'message',
                senderName: this.titleCase(requesterId),
                recipientName: this.titleCase(friendId),
                timestamp: new Date(),
                status: null
            },{
                chatId: requesterId + '_' + friendId,
                senderId: requesterId,
                recipientId: friendId,
                content: 'This is a pretty long message, where I\'m trying to test the divs of both sides and now I\'m repeating everything in portuguese. Essa é uma mensagem muito grande, onde eu estou tentando testar as divs de ambos os lados e agora vou repetir tudo em inglês.',
                senderName: this.titleCase(requesterId),
                recipientName: this.titleCase(friendId),
                timestamp: new Date(),
                status: null
            },{
                chatId: requesterId + '_' + friendId,
                senderId: friendId,
                recipientId: requesterId,
                content: 'This is a pretty long message, where I\'m trying to test the divs of both sides and now I\'m repeating everything in portuguese. Essa é uma mensagem muito grande, onde eu estou tentando testar as divs de ambos os lados e agora vou repetir tudo em inglês.',
                senderName: this.titleCase(friendId),
                recipientName: this.titleCase(requesterId),
                timestamp: new Date(),
                status: null
            },{
                chatId: requesterId + '_' + friendId,
                senderId: friendId,
                recipientId: requesterId,
                content: 'message',
                senderName: this.titleCase(friendId),
                recipientName: this.titleCase(requesterId),
                timestamp: new Date(),
                status: null
            },{
                chatId: requesterId + '_' + friendId,
                senderId: friendId,
                recipientId: requesterId,
                content: 'message',
                senderName: this.titleCase(friendId),
                recipientName: this.titleCase(requesterId),
                timestamp: new Date(),
                status: null
            }
        ];
    }
    
    private titleCase(name: string){
        return name.substring(0,1).toUpperCase() + name.substring(1);
    }

    loadFriendsList(idJogo: number, idPessoa: number){
        // return [
        //     {
        //         nome: 'Amigo',
        //         id: 'amigo'
        //     },
        //     {
        //         nome: 'Inimigo',
        //         id: 'inimigo'
        //     },
        //     {
        //         nome: 'Neutro',
        //         id: 'neutro'
        //     }
        // ];
        return this.httpClient.get<PersonSimplified[]>(
            API + '/' + idJogo + CHAT_HTTP_ROUTE + '/listaContatoChat/' + idPessoa
        );
    }

}