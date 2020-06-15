import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface TokenObject {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const authTokenExist: boolean = this.cookieService.check('authToken');
    if (authTokenExist) {
      this.router.navigate(['/movies']);
    }
  }

  Auth() {
    // console.log(this.loginForm.value);
    if (!this.registerMode) {
      this.Login();
    } else {
      if (
        this.loginForm.value.password === this.loginForm.value.confirmPassword
      ) {
        this.apiService
          .registerUser(
            this.loginForm.value.username,
            this.loginForm.value.password
          )
          .subscribe(
            (result: TokenObject) => {
              console.log(result);
              this.Login();
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        console.log('passwords not same!');
      }
    }
  }

  Login() {
    this.apiService.loginUser(this.loginForm.value).subscribe(
      (result: TokenObject) => {
        // console.log(result);
        this.cookieService.set('authToken', result.token);
        this.router.navigate(['/movies']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
