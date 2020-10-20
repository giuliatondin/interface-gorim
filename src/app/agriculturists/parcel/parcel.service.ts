import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PostForm } from './postForm';

const API = environment.ApiUrl + '/request/api/agricultor';

@Injectable({
    providedIn:'root'
})
export class ParcelService{

    constructor(
        private httpClient: HttpClient
    ){
        //
    }
    
    
    postAgricultiristForm(
        idAgr: number,
        postForm: PostForm
    ){
        console.log("idAgr ParcelService: " + idAgr);
        console.log('JSON: ' + JSON.stringify(postForm));
        return this.httpClient.post(
            API + '/' + idAgr,
            postForm
        );
    }
}