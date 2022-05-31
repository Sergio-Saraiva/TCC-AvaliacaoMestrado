import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInformation } from '../../models/user-information';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  user: UserInformation;
  ngOnInit(): void {
    this.user = this.userService.getUserInformation();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
