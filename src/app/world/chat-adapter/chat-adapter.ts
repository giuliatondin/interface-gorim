import { ChatAdapter, ChatParticipantStatus, ChatParticipantType, Group, IChatGroupAdapter, IChatParticipant, Message, ParticipantResponse } from 'ng-chat';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { PersonSimplified } from '../models/person.simplified';
import { ChatAdapterService } from './chat-adapter.service';

export class GorimChatAdapter extends ChatAdapter {

    public static contactList: IChatParticipant[] = [];

    constructor(
        private idJogo: number,
        private idPessoa: number,
        private chatAdapterService: ChatAdapterService
    ){
        super();

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
                    }
                );

                this.listFriends().subscribe(response => {
                    this.onFriendsListChanged(response);
                });
            },
            err => console.log(err)
        );
        
    }
    
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
      let mockedHistory: Array<Message>;
  
      mockedHistory = [
        {
          fromId: 2,
          toId: 1,
          message: "Hi there, just type any message bellow to test this Angular module.",
          dateSent: new Date()
        }
      ];
  
      return of(mockedHistory).pipe(delay(2000));
    }
  
    sendMessage(message: Message): void {
      // Do something
    }

    

}