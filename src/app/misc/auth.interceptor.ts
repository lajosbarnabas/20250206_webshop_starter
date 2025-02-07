import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let auth = inject(AuthService);

  if(auth.loggedInUser && auth.loggedInUser.token){
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', auth.loggedInUser.token)
    });
    return next(reqWithHeader);
  }
  return next(req);
};
