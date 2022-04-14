import { Component, OnInit } from '@angular/core';
import mockData from '../../../../assets/data/mockData.json';
import $ from 'jquery';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
 isVisible:boolean = false;
 noteData = mockData;
 
  constructor() { }

  ngOnInit(): void {
    this.toggleNoteDisplay()
    console.log(this.noteData)
    console.log(this.noteData[0].note_title)
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
