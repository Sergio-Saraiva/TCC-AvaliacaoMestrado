import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/shared/services/home.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.homeService.getAll().subscribe((data) => console.log(data));
  }
}
