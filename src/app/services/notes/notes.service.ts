import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient:HttpClient) { 
  }

  getNotes(userId:string) {
    return this.httpClient.get(`https://notes-service-app.herokuapp.com/notes/get/${userId}`)
  }
}
