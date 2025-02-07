import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);

  if(route.routeConfig?.path === 'admin'){
    if(authService.loggedInUser?.roles.includes('admin')){
      return true;
    }
    return false;
  }

  if(route.routeConfig?.path === 'orders'){
    if(authService.loggedInUser?.roles.includes('user')){
      return true;
    }
    return false;
  }

  return false;
};
