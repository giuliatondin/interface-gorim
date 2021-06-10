import { Injectable } from "@angular/core";
import { Client, CompatClient, IFrame, IPublishParams, Stomp, StompSubscription } from '@stomp/stompjs';

import { environment } from "src/environments/environment";
import { Message } from "../chat/message";
import { ChatService } from "../chat/chat.service";
import { Observable, of } from "rxjs";

const WebSocketURL = environment.WebSocketURL;

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private stompClient: Client = new Client();
    private idChatPessoa: string = '';
    private nomePessoa: string;
    private personService: any;

    private isItFirsTime: boolean = true;
    private subscription: StompSubscription = null;

    constructor(
        private chatService: ChatService
    ){ }

    isMessageEmpty(message: Message): boolean {
        if(
            message.chatId === '' &&
            message.content === '' &&
            message.recipientId === '' &&
            message.recipientName === '' &&
            message.senderId === '' &&
            message.senderName === '' &&
            message.status === null &&
            message.timestamp === null
        ){
            return true;
        }
        else return false;
    }
    /**
     * Três modos de fazer:
     * * Deixar como estava e colocar um timer dentro de um while até o websocket estar DISCONNECTED
     * * Criar um destrutor e chamar o destrutor, próxima página chamar o construtor
     * * Fazer que nem vi no site
     */
    config(idChatPessoa: string, nomePessoa: string, password: string, personService){
        console.log('idChatPessoa: ' + idChatPessoa + '; nomePessoa: ' + nomePessoa + '; password: ' + password);
        this.idChatPessoa = idChatPessoa.toLowerCase();
        this.nomePessoa = nomePessoa;
        this.personService = personService;
        var that = this;
        this.stompClient.configure({
            brokerURL: WebSocketURL,
            connectHeaders: {
                username: this.idChatPessoa,
                password: password
            },
            debug: (str) => {
              console.log(str);
            },
            reconnectDelay: 500,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            logRawCommunication: false,
            onStompError: (frame) => {
              console.log("Stomp Error", frame);
            },
            onConnect: (frame) => {
              console.log(">>>>>> CONNECTED", frame);
              if (this.stompClient.connected) {
                this.subscription = this.stompClient.subscribe(
                    '/user/' + this.idChatPessoa + '/queue/messages',
                    (notification) => {
                        if(that.isChatNotification(notification))
                            that.chatService.nextChatNotification(notification);
                        else if(that.isGameNotification(notification))
                            //
                            return;
                    }
                );
              }
            },
            onDisconnect: (frame) => {
              console.log(">>>> Disconnected", frame);
            },
            onWebSocketClose: (frame) => {
              console.log(">>>>> CLOSED", frame);
            },
            onWebSocketError: (frame) => {
              console.log(">>>>> WS ERROR", frame);
            },
        });
        if(this.isItFirsTime){
            this.chatService.sharedSentMessages.subscribe(
                (message: Message) => {
                    if(!this.isMessageEmpty(message))
                        this.sendMessage(message)
                }
            );
            this.isItFirsTime = false;
        }
    }

    connect(){
        this.stompClient.activate();
    }

    changeConnection(idChatPessoa: string, nomePessoa: string, password: string, personService){
        if((this.subscription != null) && (this.idChatPessoa != idChatPessoa)){
            this.chatService.nextCloseChatRoom('FECHAR_TODAS_AS_JANELAS');
    
            this.idChatPessoa = idChatPessoa.toLowerCase();
            this.nomePessoa = nomePessoa;
            this.personService = personService;
            this.subscription.unsubscribe();
    
            let that = this;
            this.subscription = this.stompClient.subscribe(
                '/user/' + this.idChatPessoa + '/queue/messages',
                (notification) => {
                    if(that.isChatNotification(notification))
                        that.chatService.nextChatNotification(notification);
                    else if(that.isGameNotification(notification))
                        //
                        return;
                }
            );
        }
        else if((this.subscription == null) && (this.idChatPessoa != idChatPessoa)){
            this.config(idChatPessoa, nomePessoa, password, personService);
            this.connect();
        }
    }

    isChatNotification(msg): boolean {
        return true;
    }

    isGameNotification(msg): boolean {
        return false;
    }

    sendMessage(message: Message){
        console.log('Enviando mensagem para ' + message.recipientId);
        console.log({
            destination: '/app/chat',
            body: JSON.stringify(message)
        } as IPublishParams);

        this.stompClient.publish(
            {
                destination: '/app/chat',
                body: JSON.stringify(message)
            } as IPublishParams
        );
    }

    isConnected(){
        return this.stompClient.connected;
    }
}