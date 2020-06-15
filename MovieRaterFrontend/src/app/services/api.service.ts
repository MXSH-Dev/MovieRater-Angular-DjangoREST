import { Movie } from './../models/movie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/movies/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseUrl, {
      headers: this.constructAuthHeaders(),
    });
  }

  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseUrl}${id}/`, {
      headers: this.constructAuthHeaders(),
    });
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({ title: title, description: description });
    return this.httpClient.post(`${this.baseUrl}`, body, {
      headers: this.constructAuthHeaders(),
    });
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({ title: title, description: description });
    return this.httpClient.put(`${this.baseUrl}${id}/`, body, {
      headers: this.constructAuthHeaders(),
    });
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseUrl}${id}/`, {
      headers: this.constructAuthHeaders(),
    });
  }

  rateMovie(rate: number, movieId: number) {
    const body = JSON.stringify({ stars: rate });
    return this.httpClient.post(`${this.baseUrl}${movieId}/rate_movie/`, body, {
      headers: this.constructAuthHeaders(),
    });
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    const authUrl = 'http://localhost:8000/auth/';
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post(`${authUrl}`, body, {
      headers: header,
    });
  }

  registerUser(username, password) {
    const body = JSON.stringify({ username: username, password: password });
    const authUrl = 'http://localhost:8000/api/users/';
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post(`${authUrl}`, body, {
      headers: header,
    });
  }

  constructAuthHeaders() {
    const token = this.cookieService.get('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
  }
}
