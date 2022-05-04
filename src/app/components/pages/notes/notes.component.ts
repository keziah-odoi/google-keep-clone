import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { NotesService } from 'src/app/services/notes/notes.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  isVisible: boolean = false;
  title : string = "";
  description : string = "";
  userID = localStorage.getItem('userID')
  user: SocialUser = new SocialUser;
  loggedIn?: boolean;
  data:any;
  notesData:any[] = [];
  pipe = new DatePipe('en-US');
  todayWithPipe : any;
  sortedArray : any[] = [];
  constructor(
    private noteService: NotesService,
    private authService: SocialAuthService,
    private authentication : AuthService
  ) { 
    this.data = JSON.parse(localStorage.getItem('user') || '{}');
  
  }

  ngOnInit() {
    this.toggleNoteDisplay()
    this.getNotes()
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user)
      this.loggedIn = (user != null);
    });
    this.textarea()

  }


  addNote() {
    this.resizeTextArea()
    if(this.title == "" && this.description == ""){
      return
    }
   
    if (this.data == null) {
      return
    }
          const payload = {
          "userID" : this.data.id,
          "title" : this.title,
            "description" : this.description
        }
        this.noteService.addNote(payload).subscribe(
          {next :(data:any)=>{
              console.log("Successful")
              this.getNotes()
              this.clearFields()

          },
          error :(e) =>{
              console.log("failed")
          }
        }
        )

  }

  getNotes(){
      if(this.data !== null){
     this.noteService.getNotes(this.data.id).subscribe(
       {
         next :(data :any)=>{
           this.notesData = data
           this.notesData = this.notesData.reverse()
           console.log(this.notesData)
                   },
        error:(e)=>{
          console.log(e)
        }})
  }
  return 
}

  generateID():string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "" 
    const charactersLength = characters.length;
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    console.log(result)
      return result
   }

  showNote() {
    this.isVisible = true;
  }

  toggleNoteDisplay() {
    $('#takenote').on("click", function (e) {
      e.stopPropagation(); // Prevent bubbling
    });
    $(document).on("click", () => {
      this.addNote()
      this.isVisible = false
    });
  }

  closeNote() {
    this.isVisible = false
  }

  clearFields(){
    this.description = "";
    this.title = "";
  }

  resizeTextArea(){
    $(".note").on('click', function(){
      $(".textarea").css('height','20px');

    });
  }

  signInWithGoogle(){
    this.authentication.signInWithGoogle()
    this.getNotes()
  }

  logout(){
    this.authentication.signOut()
    localStorage.removeItem('user')
    this.getNotes()
  }
 
  textarea(){
    $(".textarea").on('input', function() {
      var scroll_height = $(".textarea").get(0)?.scrollHeight;
    
      $(".textarea").css('height', scroll_height + 'px');
    });

  }
 
}
