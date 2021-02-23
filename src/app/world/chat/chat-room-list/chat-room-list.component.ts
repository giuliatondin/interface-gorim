import { AfterViewInit, Component, HostListener, Input, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";

@Component({
    selector: 'app-chat-room-list',
    templateUrl: './chat-room-list.component.html',
    styleUrls: [ './chat-room-list.component.scss' ]
})
export class ChatRoomListComponent implements OnInit, AfterViewInit {
    @Input() nomePessoa: string;
    @Input() idPessoa: number;
    @Input() idJogo: number;

    openedRooms: string[] = [];
    chatQuantity: number = 0;

    idChatPessoa: string;

    private limiteChatRooms: number = 0;

    constructor(
        private chatService: ChatService
    ){}

    ngOnInit(){
        this.chatService.sharedfriendNames.subscribe(
            (friendName: string) => {
                if(friendName != ''){
                    if(this.chatQuantity == this.limiteChatRooms){
                        this.openedRooms.shift();
                        this.chatQuantity--;
                    }
                    this.openedRooms.push(friendName);
                    this.chatQuantity++;
                }
            }
        );
    }

    ngAfterViewInit(){
        this.configuraQuantidadeChatRooms();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.configuraQuantidadeChatRooms();
    }

    configuraQuantidadeChatRooms(){
        const windowWidth = window.innerWidth;

        if(windowWidth > 1080) this.limiteChatRooms = 4;
        else if(windowWidth < 680) this.limiteChatRooms = 2;
        else if(windowWidth < 1080) this.limiteChatRooms = 3;


        if(this.chatQuantity > this.limiteChatRooms){
            this.openedRooms.shift();
            this.chatQuantity--;
        }
    }

    getChatRoomClass(index: number){
        return 'col --chat-room room-' + (index+1);
    }
}