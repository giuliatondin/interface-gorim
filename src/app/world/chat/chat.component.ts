import { Component, Input, OnInit } from "@angular/core";
import * as Stomp from 'stomp-client/lib/client';
import * as SockJS from 'sockjs-client';


//var Stomp = require('../lib/client').StompClient;

import { ChatService } from "./chat.service";
import { environment } from "src/environments/environment";

const API_WS = environment.ApiUrl + '/ws';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: [ './chat.component.scss' ]
})
export class ChatComponent implements OnInit{
    @Input() nomePessoa: string;
    @Input() idPessoa: number;
    @Input() idJogo: number;
    @Input() role: string;
    @Input() cidade: string;

    private stompClient: any;

    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit(){
    
        const connect = () => {
            var sockjs = new SockJS(API_WS);
            return Stomp.over(sockjs).connect({}, onConnected, onError);
        };
    
        const onConnected = () => {
            console.log('connected');
            console.log(this.nomePessoa);
            this.stompClient.subscribe(
                    '/user/' + this.idJogo + this.nomePessoa + '/queue/messages',
                    onMessageReceived
            );
        };
      
        const onError = (err) => {
            console.log(err);
        };

        const onMessageReceived = () => {

        };

    }

}