import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable} from 'rxjs';

import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

import { AnimalIntData } from '../models/animals';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class AnimalData {


    url = 'http://localhost:3000/api/animals';
    baseUrl = 'http://localhost:3000/api/';
    constructor(
        private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage
    ) { }

    
    //GET (Read)
    getAllAnimals() : Observable<AnimalIntData[]> {
        return this.http.get<AnimalIntData[]>(this.url, {
            
        });
    }

    getAnimalsByType(amount: number, page: number, Animal_Type: string) : Observable<AnimalIntData[]> {
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', amount)
            .set('animal_type', Animal_Type)
        return this.http.get<AnimalIntData[]>(`${this.url}/type`, {
            params
        });
    }

    getAnimalsByIDRange(start: number) : Observable<AnimalIntData[]> {
        const params = new HttpParams()
            .set('animalID', start);
        return this.http.get<AnimalIntData[]>(`${this.url}/id/${start}`, {
            params
        });
    }
    
    getAnimalsByRecord(rec_num:string) : Observable<AnimalIntData[]> {
        let conversion = parseInt(rec_num);
        return this.http.get<AnimalIntData[]>(this.url + '/' + conversion, {
            
        });
    }

    //GET with Server Sided Pagination
    getAnimalsPaged() : Observable<AnimalIntData[]> {
        return this.http.get<AnimalIntData[]>(`${this.url}Paged`, {
        });
    }

    getAnimalsPagedBounds(amount: number, page: number, direction: number) : Observable<AnimalIntData[]> {
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', amount)
            .set('direction', direction)
            .set('animal_type', '')
        return this.http.get<AnimalIntData[]>(`${this.url}Paged`, {
            params
        });
    }

    

    //POST (Create)
    addAnimal(formData: AnimalIntData){
        return this.http.post<AnimalIntData>(this.url, formData);
    }

    //PUT   (Update)
    updateAnimal(formData: AnimalIntData): Observable<AnimalIntData[]>{
        return this.http.put<AnimalIntData[]>(this.url + '/' + formData.rec_num, formData);
    }

    //DELETE    (DELETE)
    removeAnimalByRecord(rec_num:string) : Observable<AnimalIntData[]> {
        let conversion = parseInt(rec_num);
        return this.http.delete<AnimalIntData[]>(this.url + '/' + conversion, {
            
        });
    }

    // Security Implementation
    // Call to our /login endpoint, returns JWT
    login(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside AnimalDataService::login');
        return this.handleAuthAPICall('login', user, passwd);
    }
    // Call to our /register endpoint, creates user and returns JWT
    register(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside AnimalDataService::register');
        return this.handleAuthAPICall('register', user, passwd);
    }
    // helper method to process both login and register methods
    handleAuthAPICall(endpoint: string, user: User, passwd: string) :
    Observable<AuthResponse> {
        // console.log('Inside AnimalDataService::handleAuthAPICall');
        let formData = {
            name: user.name,
            email: user.email,
            password: passwd
        };
        return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
    }
}
