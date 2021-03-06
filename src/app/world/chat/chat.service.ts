import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { environment } from "src/environments/environment";
import { PersonSimplified } from "../models/person.simplified";
import { WebStorageService } from "../web-storage/webstorage.service";
import { ChatNotification } from "./chat-notification";
import { Message } from "./message";

const API = environment.ApiUrl;
const CHAT_HTTP_ROUTE = '/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private friendName = new BehaviorSubject<string>('');
    sharedfriendNames = this.friendName.asObservable();

    private chatNotifications = new BehaviorSubject<ChatNotification>({} as ChatNotification);
    sharedChatNotifications = this.chatNotifications.asObservable();

    private readMessages = new BehaviorSubject<string>('');
    sharedReadMessages = this.readMessages.asObservable();

    private closeChatRoom = new BehaviorSubject<string>('');
    sharedCloseChatRooms = this.closeChatRoom.asObservable();

    private sentMessages = new BehaviorSubject<Message>({
        chatId: '',
        senderId: '',
        recipientId: '',
        content: '',
        senderName: '',
        recipientName: '',
        timestamp: null,
        status: null
    } as Message);
    sharedSentMessages = this.sentMessages.asObservable();

    constructor(
        private webStorageService: WebStorageService,
        private httpClient: HttpClient
    ){ }

    nextFriendName(friendName: string) {
        this.friendName.next(friendName);
    }

    nextChatNotification(chatNotification){
        var notification = JSON.parse(chatNotification.body);
        if(notification != {} as ChatNotification)
            this.chatNotifications.next(notification);
    }

    nextReadMessages(friendName: string){
        if(friendName != '')
            this.readMessages.next(friendName);
    }

    nextCloseChatRoom(chatRoom: string){
        this.closeChatRoom.next(chatRoom);
    }

    nextSentMessages(message: Message){
        this.sentMessages.next(message);
        console.log(message);
    }

    loadMessages(requesterId: string, friendId: string){
        return this.httpClient.get<Message[]>(
            API + '/messages/' + requesterId + '/' + friendId
        );
    }
    
    private titleCase(name: string){
        return name.substring(0,1).toUpperCase() + name.substring(1);
    }

    loadFriendsList(idJogo: number, idPessoa: number){
        return this.httpClient.get<PersonSimplified[]>(
            API + '/request/api/' + idJogo + CHAT_HTTP_ROUTE + '/listaContatoChat/' + idPessoa
        );
    }

    getNewMessage(messageId: number) {
        return this.httpClient.get<Message>(
            API + '/messages/' + messageId
        );
    }

}