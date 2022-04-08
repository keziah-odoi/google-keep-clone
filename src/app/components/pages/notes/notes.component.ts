import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
 isVisible:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showArea(){
    this.isVisible = true;
  }

 revert(){
   this.isVisible = false;
 }

}
