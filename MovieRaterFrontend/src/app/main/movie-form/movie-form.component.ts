import { ApiService } from './../../services/api.service';
import { Movie } from './../../models/movie';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  id = null;

  @Input() set movie(value: Movie) {
    this.movieForm = new FormGroup({
      title: new FormControl(value.title),
      description: new FormControl(value.description),
    });
    this.id = value.id;
    // console.log(this.id);
  }

  @Output() movieCreatedEmitter = new EventEmitter<Movie>();
  @Output() movieUpdatedEmitter = new EventEmitter<Movie>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  saveForm() {
    console.log(this.id, this.movieForm.value);
    if (!this.id) {
      this.apiService
        .createMovie(
          this.movieForm.value.title,
          this.movieForm.value.description
        )
        .subscribe(
          (result: Movie) => {
            console.log('movie-form:', result);
            this.movieCreatedEmitter.emit(result);
          },
          (err) => console.log(err)
        );
    } else {
      this.apiService
        .updateMovie(
          this.id,
          this.movieForm.value.title,
          this.movieForm.value.description
        )
        .subscribe(
          (result: Movie) => {
            console.log('movie-form:', result);
            this.movieUpdatedEmitter.emit(result);
          },
          (err) => console.log(err)
        );
    }
  }

  formDisabled() {
    if (
      this.movieForm.value.title.length &&
      this.movieForm.value.description.length
    ) {
      return false;
    } else {
      return true;
    }
  }
}
