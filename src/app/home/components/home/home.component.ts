import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.homeService.getAll().subscribe((data) => console.log(data));
  }
}
