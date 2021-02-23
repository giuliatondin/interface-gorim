import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ChatService } from "../../chat.service";
import { Message } from "./message";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: [ './chat-room.component.scss' ]
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
    @Input() nomeAmigo: string;
    @Input() nomePessoa: string;
    @Input() idJogo: number;
    
    idChatPessoa: string;
    idChatAmigo: string;

    @ViewChild('scrollMe') private scrollMe: ElementRef;

    messages: Message[] = [];

    chatForm: FormGroup;

    constructor(
        private chatService: ChatService,
        private formBuilder: FormBuilder
    ){ }

    ngOnInit(){
        this.idChatPessoa = "" + this.idJogo + this.nomePessoa.toLowerCase();
        this.idChatAmigo = "" + this.idJogo + this.nomeAmigo.toLowerCase();
        this.messages = this.chatService.loadMessages(
            this.nomePessoa.toLowerCase(), this.nomeAmigo.toLowerCase()
        );
        this.inicializaForm();
    }

    ngAfterViewChecked(){
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        try {
            this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
        } catch(err){
            console.log(err);
        }
    }

    inicializaForm(){
        this.chatForm = this.formBuilder.group({
            message: ['', [Validators.required]]
        });
    }

    isMine(sender: string){
        if(sender.includes(this.nomeAmigo)) return 'receivedMessage';
        return 'sentMessage';
    }

    getHour(timestamp: Date){
        return timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    enterPressed(event: KeyboardEvent){
        if(!event.shiftKey) this.sendMessage();
    }

    sendMessage(){
        let message: string = this.chatForm.get('message').value.replace(new RegExp('\n', 'g'), "<br />");
        while(message.endsWith('<br />')) message = message.substring(0, message.length-6);
        let newChatMessage: Message = {
            content: message,
            status: null,
            chatId: this.nomePessoa.toLowerCase() + '_' + this.nomeAmigo.toLowerCase(),
            senderId: this.nomePessoa.toLowerCase(),
            timestamp: new Date,
            senderName: this.nomePessoa,
            recipientId: this.nomeAmigo.toLowerCase(),
            recipientName: this.nomeAmigo
        };
        this.messages.push(newChatMessage);
        this.scrollToBottom();
        this.inicializaForm();
    }
}