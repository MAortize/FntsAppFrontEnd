import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


export const isAdmin = () => {
    const isAdmin = inject(AuthService).esAdmin(sessionStorage.getItem('email'))
    if (isAdmin) {
      return isAdmin
    }
    return inject(Router).createUrlTree(['/authpage'])

}