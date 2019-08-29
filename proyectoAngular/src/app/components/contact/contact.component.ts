import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public widthSlider:number;
  public anchorSlider:any;
  public autor:any;
  constructor() { }

  ngOnInit() {
    
  }
  cargarSlider(){
   this.anchorSlider = this.widthSlider; 
  }
  resetear(){
    this.anchorSlider = false;
  }
  getAutor(event){
    this.autor = event;
  }
}
