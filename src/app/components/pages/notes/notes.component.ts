import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Notesdata } from 'src/app/classes/notesdata/notesdata';

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
  // notesData : Notesdata = new Notesdata()
  notesData:any
  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit() {
    this.toggleNoteDisplay()
    this.getNotes()
    this.resize()
  }


  addNote() {
    if(this.title == "" && this.description == ""){
      console.log("fields empty")
      return
    }
   
    if (localStorage.getItem('userID') == null) {
      const userID = this.generateID()
           localStorage.setItem('userID', userID)
           const payload = {
            "userID" : userID,
            "title" : this.title,
             "description" : this.description
          }
          this.noteService.addNote(payload).subscribe(
            {next :(data:any)=>{
                console.log("Successful")
                this.clearFields()
            },
            error :(e) =>{
                console.log("failed")
            }
          }
          )
    }
          const payload = {
          "userID" : this.userID,
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
      if(this.userID !== null){
     this.noteService.getNotes(this.userID).subscribe(
       {
         next :(data :any)=>{
           this.notesData = data
           console.log(data)
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

  resize(){
    $('.textarea').resize()

  }
 
}
