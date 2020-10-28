import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
const MAYOR_ROUTE = '/request/api/prefeito';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class MayorService {
    
    constructor(
        private httpClient: HttpClient
    ){ }
}