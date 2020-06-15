import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MainRoutingModule } from '../main/main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './../services/api.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService, CookieService],
})
export class AuthModule {}
