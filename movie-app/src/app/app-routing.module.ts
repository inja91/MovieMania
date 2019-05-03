import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { MoviesComponent } from './movies/movies/movies.component';
import { AddComponent } from './movies/add/add.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
	{path: 'movies/add', component: AddComponent},
	{path: 'movies/add/:id', component: AddComponent},
	{path: '', redirectTo: '/movies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
