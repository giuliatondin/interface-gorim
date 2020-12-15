import { ChatAdapter, ChatParticipantStatus, ChatParticipantType, Group, IChatGroupAdapter, IChatParticipant, Message, ParticipantResponse } from 'ng-chat';
import { interval, Observable, of } from 'rxjs';
//import * as signalR from '@aspnet/signalr';

import { PersonSimplified } from '../models/person.simplified';
import { ChatAdapterService } from './chat-adapter.service';
import { environment } from 'src/environments/environment';
import { WebSocketConnector } from './web-socket-connector';
import { HttpClient } from '@angular/common/http';

import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

export class GorimChatAdapter extends ChatAdapter {

    private idJogo: number;
    private idPessoa: number;

    public static contactList: IChatParticipant[] = [];
    messageHistory: Message[][] = [];
    ultimaMensagem: number[] = [];

    // essaPessoa: IChatParticipant = {
    //     id: this.idPessoa,
    //     participantType: ChatParticipantType.User,
    //     displayName: "Me",
    //     status: ChatParticipantStatus.Offline,
    //     avatar: null
    // };

    title = 'app';

    greetings: string[] = [];
    showConversation: boolean = false;
    ws: any;
    name: string;
    disabled: boolean;

    private webSocketConnector: WebSocketConnector;
    private httpClient: HttpClient;
    items: any[] = [];

    constructor(
        private chatAdapterService: ChatAdapterService
    ){
        super();
    }

    setConnected(connected) {
      this.disabled = connected;
      this.showConversation = connected;
      this.greetings = [];
    }

    sendName() {
        let obj = {
            name: "Vinicius",
            toId: 2
        };
        let data = JSON.stringify(obj);
        this.ws.send('/user/2/queue/app/message', data, {});
    }

    showGreeting(message) {
      this.showConversation = true;
      //this.greetings.push(message)
      console.log('Greeting: ' + message);
    }

    friendsListChangedHandler: (participantsResponse: ParticipantResponse[]) => void;
    messageReceivedHandler: (participant: IChatParticipant, message: Message) => void;

    public configAdapter(idJogo: number, idPessoa: number){

        this.idPessoa = idPessoa;
        this.idJogo = idJogo;

        var socket = new WebSocket('ws://localhost:8080/greeting/websocket');
        this.ws = Stomp.over(socket);
        let that = this;
        this.ws.connect({}, function(frame) {
            that.ws.subscribe('/user/queue/errors', function(message) {
                console.log('Error ' + message.body);
            });
            that.ws.subscribe('/user/queue/reply', function(message) {
                console.log("MENSAGEM: " + message)
                that.showGreeting(message.body);
            });
            that.disabled = true;
            
            that.sendName();


        }, function(error) {
            alert('STOMP error ' + error);
        });
        
        //GorimChatAdapter.serverBaseUrl += '/' + this.idPessoa;

        this.chatAdapterService.getContactList(this.idJogo, this.idPessoa).subscribe(
            (data: PersonSimplified[]) => {
                data.forEach(
                    (pessoa: PersonSimplified) => {
                        GorimChatAdapter.contactList.push({
                            id: pessoa.id,
                            displayName: pessoa.nome,
                            status: ChatParticipantStatus.Online,
                            avatar: null,
                            participantType: ChatParticipantType.User
                        });
                        this.messageHistory.push([]);
                        this.ultimaMensagem.push(-1);
                    }
                );

                this.listFriends().subscribe(response => {
                    this.onFriendsListChanged(response);
                });
            },
            err => console.log(err)
        );
        
        this.initializeConnection();
    }
    
    private initializeConnection(): void {
        // this.hubConnection = new signalR.HubConnectionBuilder()
        //   .withUrl(GorimChatAdapter.serverBaseUrl, {
        //     transport: signalR.HttpTransportType.ServerSentEvents
        //   })
        //   .build();

        // this.chatAdapterService.getServerSentEvents(this.idJogo, this.idPessoa).subscribe(
        //     data => {
        //         console.log(data);
        //     }
        // );
        
        // this.hubConnection
        //   .start()
        //   .then(() => {
        //     this.joinRoom();
    
        //     this.initializeListeners();
        //   })
        //   .catch(err => console.log('Error while starting SignalR connection: ' + err));

        this.initializeListeners();
    }
    
    private initializeListeners(): void {
        // this.hubConnection.on("generatedUserId", (userId) => {
        //   // With the userId set the chat will be rendered
        //   this.userId = userId;
        // });
        
        //this.eventSource.addEventListener()

        // this.hubConnection.on("messageReceived", (participant, message) => {
        //   // Handle the received message to ng-chat
        //   console.log(message);
        //   this.onMessageReceived(participant, message);
        // });
    
        // this.hubConnection.on("friendsListChanged", (participantsResponse: Array<ParticipantResponse>) => {
        //   // Handle the received response to ng-chat
        //   this.onFriendsListChanged(participantsResponse.filter(x => x.participant.id != this.idPessoa));
        // });
    }
    
    //   joinRoom(): void {
    //     if (this.hubConnection && this.hubConnection.state == signalR.HubConnectionState.Connected) {
    //         // Aqui era nome e não id
    //       this.hubConnection.send("join", this.idPessoa);
    //     }
    //   }
    
    listFriends(): Observable<ParticipantResponse[]> {
        let listaContatos: ParticipantResponse[] = [];

        GorimChatAdapter.contactList.forEach(
            (participant: IChatParticipant) => {
                listaContatos.push({
                    participant: participant,
                    metadata: {}
                } as ParticipantResponse);
            }
        );
        
        return of(listaContatos);
    }

    getMessageHistory(destinataryId: any): Observable<Message[]> {
        // let index = (destinataryId < this.idPessoa) ? (destinataryId - 1) : (destinataryId - 2);

        // this.chatAdapterService.getNovasMensagens(
        //     this.idJogo,
        //     this.idPessoa,
        //     destinataryId,
        //     this.ultimaMensagem[index]
        // ).subscribe(
        //     (data: Message[]) => {
        //         console.log(data);
        //         data.forEach(
        //             (mensagem: Message) => {
        //                 this.messageHistory[index].push(mensagem);
        //                 this.onMessageReceived(this.essaPessoa, mensagem);
        //             }
        //         );
        //         this.ultimaMensagem[index] = this.messageHistory[index].length;
        //         //this.onMessageReceived
        //     },
        //     err => console.log(err)
        // );
        
        // return of(this.messageHistory[index]);
        return of([]);
    }
  
    sendMessage(message: Message): void {
        // this.chatAdapterService.sendMessage(this.idJogo, message);
        // if (this.hubConnection && this.hubConnection.state == signalR.HubConnectionState.Connected)
        //     this.hubConnection.send("sendMessage", message);
    }
    

}