import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit {

  description = 'Esse é o componente do agricultor!'

  constructor() { }

  ngOnInit(): void {
  }

}
