import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agriculturist',
  templateUrl: './agriculturist.component.html',
  styleUrls: ['./agriculturist.component.scss']
})
export class AgriculturistComponent implements OnInit {

  existProducts = true;

  constructor() { }

  ngOnInit(): void {
  }

}
