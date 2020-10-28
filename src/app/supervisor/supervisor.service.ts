import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
const SUPERVISOR_ROUTE = '/request/api/fiscal';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class SupervisorService {
    
    constructor(
        private httpClient: HttpClient
    ){ }
}