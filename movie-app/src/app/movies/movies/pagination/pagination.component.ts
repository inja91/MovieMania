import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number;
  @Input() pageSize: number;
  @Output() onPageSelected = new EventEmitter();
  pages: number[];
  activePage: number = 1;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.pages = [];
    for(let i=1; i<=this.getNoPages(); i++){
      this.pages.push(i);
    }
  }

  getNoPages(): number {
    return Math.ceil(this.totalItems/this.pageSize);
  }

  pageSelected(newPage: number) {
    if(newPage => 1 && newPage <= this.getNoPages()){
      this.activePage = newPage;
      this.onPageSelected.emit(this.activePage);
    }
  }

}
