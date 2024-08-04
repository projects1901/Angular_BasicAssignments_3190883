import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonserviceService } from './services/commonservice.service';

export const authGuard: CanActivateFn = (route, state) => {

  const commonService = inject(CommonserviceService);
  const router = inject(Router);

  let isLoggedIn = commonService.isUserLoggedIn;
  if(!isLoggedIn)
  {
    alert('You need to login to access to this page');
    router.navigate(['login']);
  }
  return true;
};
