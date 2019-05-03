import { Component, OnInit, Input } from '@angular/core';
import { Movies } from '../../model/movies';

@Component({
  selector: 'mm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movieItems: Movies[];

  constructor() { }

  ngOnInit() {
  }

}
