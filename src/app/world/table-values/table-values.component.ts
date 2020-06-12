import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-values',
  templateUrl: './table-values.component.html',
  styleUrls: ['./table-values.component.scss']
})
export class TableValuesComponent implements OnInit {

  @Input() role: string;

  constructor() { }

  ngOnInit(): void {
  }

}
