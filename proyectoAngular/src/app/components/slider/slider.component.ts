import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchor: number;
  @Output() getAutor = new EventEmitter();
  public autor: any;
  constructor() {
    this.autor = {
      nombre: "Elías Comprés",
      web: "facebook.com",
      youtube: "Elías"
    }
  }

  ngOnInit() {
    $("#logo").click(function () {
      $("header").css("background", "rgba(213,53,29,0.7)")
        .css("height", "50px");

    });
    console.log(this.anchor);

    $('.slider').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: this.anchor
    });

  }
  lanzar(event){
    this.getAutor.emit(this.autor);
    console.log(event);
  }
}
