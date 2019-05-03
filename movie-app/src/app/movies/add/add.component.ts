import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movies } from '../model/movies';
import { Genre } from '../model/genres';

@Component({
  selector: 'mm-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  movie: Movies;
  movieForm: FormGroup;
  genres: Genre[];
  flag: boolean = true;

  constructor(private fb: FormBuilder, private movieService: MovieService, private router: Router,
    private route: ActivatedRoute) {
    this.createForm();
  }

  toggle() {
    this.flag = !this.flag;
  }

  createForm() {
    this.movieForm = this.fb.group({
      'name': ["", [Validators.required]],
      'description': ["", [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],
      'year': ["", [Validators.required, Validators.minLength(4)]],
      'rating': ["", [Validators.required, Validators.max(10)]],
      'duration': [""],
      'director': [""],
      'genre': [""]
    });
  }

  ngOnInit() {
    let id :string = this.route.snapshot.params.id;
    if(id){
      this.patchMovie(id);
    }

    this.movieService.getGenres().subscribe(data => this.genres = data);
  }

  patchMovie(param){
    this.movieService.get(Number(param)).subscribe(response => {
      this.movie = response;
      this.movieForm.patchValue(response);
      });
  }

  onSubmit() {
    let submittedMovie: Movies = new Movies(this.movieForm.value);
      if(this.movie && this.movie._id) {
        submittedMovie._id = this.movie._id;
        this.movieService.update(submittedMovie).subscribe(
          data => {
            this.movieForm.reset();
            this.router.navigate(['movies/']);
          }
        );
      
      } else {
        this.movieService.add(submittedMovie).subscribe(
          data => {
            this.movieForm.reset();
            this.router.navigate(['movies/'])
          }
        )
      }
  }

}
