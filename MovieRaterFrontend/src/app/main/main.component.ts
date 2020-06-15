import { Movie } from './../models/movie';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
// import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  // faFilm = faFilm;
  public movies: any = [];
  public selectedMovie: any = null;
  public editedMovie: any = null;
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const authTokenExist: boolean = this.cookieService.check('authToken');
    if (!authTokenExist) {
      this.router.navigate(['/auth']);
    } else {
      this.getMovies();
    }
  }

  getMovies() {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectMovie($event) {
    this.selectedMovie = $event;
    this.editedMovie = null;
    // console.log('main', this.selectedMovie);
  }
  editMovie($event) {
    this.editedMovie = $event;
    this.selectedMovie = null;
  }

  createNewMovie() {
    this.editedMovie = {
      title: '',
      description: '',
    };
    this.selectedMovie = null;
  }

  deleteMovie($event) {
    this.apiService.deleteMovie($event.id).subscribe(
      (result) => {
        console.log('main: ', result);
        this.getMovies();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateMovieListAfterCreate($event) {
    console.log('main: ', $event);
    this.movies.push($event);
    this.editedMovie = null;
  }

  updateMovieListAfterUpdate($event) {
    console.log('main: ', $event);
    const index = this.movies.findIndex((movie) => {
      if (movie.id === $event.id) {
        return movie;
      }
    });

    if (index >= 0) {
      this.movies[index] = $event;
    }

    this.editedMovie = null;
  }

  logout() {
    this.cookieService.delete('authToken');
    this.router.navigate(['/auth']);
  }
}
