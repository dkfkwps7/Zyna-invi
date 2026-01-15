import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Simple password check - in production, use proper authentication
    const password = prompt('Enter admin password:');
    
    if (password === 'Zyna2026') {
      return true;
    } else {
      alert('Invalid password. Access denied.');
      this.router.navigate(['/']);
      return false;
    }
  }
}
