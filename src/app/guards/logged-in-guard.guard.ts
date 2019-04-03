import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardGuard implements  CanActivate{

  constructor(private userService: UserService,
              private rouser: Router) {}

    canActivate():boolean {
        if(this.userService.getUser().username != '')
          return true;
        else 
          {
            this.rouser.navigate(['/']);
            return false;
        }
    }
}
