import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  isMenuOpen = false;
  activeLink = ''; // Stores the active route

  setActive(link: string) {
    this.activeLink = link;
  }
  toggleMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation(); // Prevents closing immediately when clicking the button
  }

  closeMenu(event: Event) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
