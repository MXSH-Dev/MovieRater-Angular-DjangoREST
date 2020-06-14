import { Movie } from './../../models/movie';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  faStar = faStar;
  // **********************************************

  rateHovered = 0;

  @Input() movie: Movie = null;

  @Output() updateMovieEmitter = new EventEmitter<Movie>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  rateHover(rate: number) {
    // console.log(rate);
    this.rateHovered = rate;
  }

  setMovieRate(rate: number) {
    // console.log('start set');

    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      (result) => {
        console.log(typeof result, result);
        this.getDetails();
        // console.log('set success');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDetails() {
    // console.log('start get');
    this.apiService.getMovie(this.movie.id).subscribe(
      (result: Movie) => {
        // console.log(result);
        // console.log('get success');
        this.updateMovieEmitter.emit(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
