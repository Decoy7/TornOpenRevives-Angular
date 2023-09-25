import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { player } from './player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();

  public updateData(newData: any[]){
    this.dataSubject.next(newData);
  }

  public getPlayers(): Observable<player[]> {
    const url = 'http://localhost:8080/api/players/latest';
    return this.http.get<player[]>(url);
  }
}
