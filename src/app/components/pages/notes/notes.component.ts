import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
 isVisible:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.toggleNoteDisplay()
  }

  showNote(){
    this.isVisible = true;
  }
 
  toggleNoteDisplay(){
    $('#takenote').on("click",function(e){
      e.stopPropagation(); // Prevent bubbling
    });
    $(document).on("click",()=>{
     this.isVisible = false
    });
   }

   closeNote(){
     this.isVisible = false
   }

}
