import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { User } from './../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signin`, { username: user.email, password: user.password })
            .pipe(map((user: User) => {
                console.log(user)
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                // user.accessToken = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    signUp(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, user)
            .pipe(map(resp => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                console.log(resp)
                // this.currentUserSubject.next(user);
                // return user;
            }));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}