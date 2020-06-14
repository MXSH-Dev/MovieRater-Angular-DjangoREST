import { Movie } from './../../models/movie';
import { ApiService } from './../../services/api.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  @Input() movies: Movie[];
  @Output() selectedMovieEmitter = new EventEmitter<Movie>();
  @Output() editedMovieEmitter = new EventEmitter<Movie>();
  @Output() createNewMovieEmitter = new EventEmitter();
  @Output() deleteMovieEmitter = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onMovieClicked(clickedMovie: Movie) {
    this.selectedMovieEmitter.emit(clickedMovie);
  }

  openEditMovie(movie: Movie) {
    this.editedMovieEmitter.emit(movie);
  }

  openNewMovie() {
    this.createNewMovieEmitter.emit();
  }

  deleteMovie(movie) {
    this.deleteMovieEmitter.emit(movie);
  }
}
