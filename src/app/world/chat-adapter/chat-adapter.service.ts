import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Message } from 'ng-chat';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';

const API = environment.ApiUrl + '/request';
const CHAT_ROUTE = '/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatAdapterService {

    constructor(
        private ngZone: NgZone,
        private httpClient: HttpClient
    ){ }

    getServerSentEvents(idJogo: number, idPessoa: number){
        return new Observable(
            observer => {
                const eventSource = new EventSource(API + '/chat/' + idPessoa + '/negotiate');

                console.log(eventSource);

                eventSource.onmessage = event => {
                    this.ngZone.run(
                        () => {
                            console.log(event);
                            observer.next(event);
                        }
                    );
                };

                eventSource.onerror = error => {
                    this.ngZone.run(
                        () => {
                            observer.error(error);
                        }
                    );
                }
            }
        );
    }

    getContactList(idJogo: number, idPessoa: number){
        return this.httpClient.get<PersonSimplified[]>(
            API + '/api/' + idJogo + CHAT_ROUTE + '/listaContatoChat/' + idPessoa
        );
    }

    // sendMessage(idJogo: number, message: Message){
    //     return this.httpClient.post(
    //         API + '/' + idJogo + CHAT_ROUTE + '/mandarMensagem',
    //         message
    //     );
    // }

    // getNovasMensagens(idJogo: number, idPessoa: number, idDestinatario: number, ultimaMensagem: number){
    //     return this.httpClient.get<Message[]>(
    //         API + '/' + idJogo + CHAT_ROUTE + '/getNovasMensagens/' + idPessoa + '/' + idDestinatario + '/' + ultimaMensagem
    //     );
    // }
}