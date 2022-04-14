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

  addNote(payload:any){
    return this.httpClient.post(`https://notes-service-app.herokuapp.com/notes/add`,payload)
  }
}
