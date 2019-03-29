import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  showMenu=false;
  loggedinUser = '';
  constructor(private modal: MatDialog,
            private accountService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser()
  {

    const interv = interval(100);
    
    interv.subscribe(n => {
    this.loggedinUser = this.accountService.getUser();
    } );
  }
  openModal() {
    const modalRef = this.modal.open(LoginModalComponent, {
      
      width:'20%',
      minWidth: '250px',
      data: {}
    });
   
     modalRef.afterClosed().subscribe(result => {
     
     // this.animal = result;
    });
  }

  switchMenu()
  {
    
    if(this.showMenu==false)
      this.showMenu=true;
    else
      this.showMenu=false;
  }
}
