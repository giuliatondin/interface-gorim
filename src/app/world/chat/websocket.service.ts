import { Injectable } from "@angular/core";
import { EMPTY, Observable, Observer, Subject } from "rxjs";
import { catchError, map, switchAll, tap } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export const WS_ENDPOINT = '';//environment.wsEndpoint;

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    constructor(){ }

    private subject: Subject<MessageEvent>;

    // public connect(url): Subject<MessageEvent> {
    //     if (!this.subject) {
    //     this.subject = this.create(url);
    //     console.log("Successfully connected: " + url);
    //     }
    //     return this.subject;
    // }

    // private create(url) {
    //     let ws = new WebSocket(url);

    //     let observable = new Observable((obs: Observer<MessageEvent>) => {
    //         ws.onmessage = obs.next.bind(obs);
    //         ws.onerror = obs.error.bind(obs);
    //         ws.onclose = obs.complete.bind(obs);
    //         return ws.close.bind(ws);
    //     });
    //     let observer = {
    //         next: (data: Object) => {
    //             if (ws.readyState === WebSocket.OPEN) {
    //                 ws.send(JSON.stringify(data));
    //             }
    //         }
    //     };
    //     return new AnonymousSubject<MessageEvent>(observer, observable);
    // }

    
    private socket$: WebSocketSubject<any>;
    private messagesSubject$ = new Subject();
    public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
    
    public connect(): void {
    
        if (!this.socket$ || this.socket$.closed) {
        this.socket$ = this.getNewWebSocket();
        const messages = this.socket$.pipe(
            map(
                err => console.log(err)
            ), catchError(_ => EMPTY));
        this.messagesSubject$.next(messages);
        }
    }
    
    private getNewWebSocket() {
        return webSocket(WS_ENDPOINT);
    }
    sendMessage(msg: any) {
        this.socket$.next(msg);
    }
    close() {
        this.socket$.complete();
    }
}