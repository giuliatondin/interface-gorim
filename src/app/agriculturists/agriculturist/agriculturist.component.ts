import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agriculturist',
  templateUrl: './agriculturist.component.html',
  styleUrls: ['./agriculturist.component.scss']
})
export class AgriculturistComponent implements OnInit {

  description = 'Almost before we knew it, we had left the ground'

  constructor() { }

  ngOnInit(): void {
  }

}
