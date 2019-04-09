import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { userDetail } from 'src/app/interfaces/user';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.scss']
})
export class ModifyAccountComponent implements OnInit {

  currentUser:userDetail;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser()
  }
  updateUser()
  {
    console.log(this.currentUser);
    this.userService.modifyUser(this.currentUser).subscribe(data => alert("account modified"));
    
  }
}
