import { Component } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  user: User = {
    firstName: 'John',
    lastName: 'Doe',
  };

  navigateToCrud() {
    this.router.navigate(['/crud']);
  }

  navigateToKanban() {
    this.router.navigate(['/']);
  }
}
