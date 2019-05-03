import { Component, OnInit } from '@angular/core';
import { Movies } from '../model/movies';
import { MoviesList } from '../model/movieList';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'mm-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movies;
  moviesList: MoviesList;

  params = {
		sort: "",
		sortDirection: "",
		page: 1,
		pageSize: 6,
		filter: {
			name: ""
		}
	}

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.refreshMovies()
  }

  refreshMovies(){
    this.movieService.getAll(this.params).subscribe(data => this.moviesList = data);
  }

  changePage(newPage: number) {
    this.params.page = newPage;
		this.refreshMovies();
  }

  getCrit() {
    let x = (<HTMLInputElement>document.getElementById("sort")).value;
    console.log(x);
    this.changeSortCriteria(x);
  }

  changeSortCriteria(criteria :string){
		if(this.params.sort == criteria){
			if(this.params.sortDirection == 'desc'){
				this.params.sortDirection = "";			
			} else {
				this.params.sortDirection = "desc";
			}
		} else {
			this.params.sort = criteria;
			this.params.sortDirection = "";
		}
		this.refreshMovies();
	}

}
