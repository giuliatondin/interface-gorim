import { Component, Input, OnInit } from "@angular/core";
import { PersonSimplified } from "../../models/person.simplified";
import { ChatService } from "../chat.service";

@Component({
    selector: 'app-chat-friends-list',
    templateUrl: './friends-list.component.html',
    styleUrls: [ './friends-list.component.scss' ]
})
export class FriendsListComponent implements OnInit{
    @Input() nomePessoa: string;
    @Input() idPessoa: number;
    @Input() idJogo: number;

    friendsList: PersonSimplified[] = [];

    panelOpenState: boolean = false;

    constructor(
        private chatService: ChatService
    ){}

    ngOnInit(){
        //this.friendsList = this.chatService.loadFriendsList(this.idJogo, this.idPessoa);
        this.chatService.loadFriendsList(this.idJogo, this.idPessoa)
        .subscribe(
            data => {
                this.friendsList = data;
            }
        );
    }

    openNewRoom(friendName: string){
        this.chatService.nextFriendName(friendName);
    }

}