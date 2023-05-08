import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../shared/enums/role.enum';
import { Router } from '@angular/router';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(
    private chatService:ChatService,
    private translate:TranslateService,
    private router:Router
    ) { }
    
  languages: string[] = ['English', 'Українська'];
  language: string | null;
 
  countUnread: number = 0;
  
  Role = Role;
  isLoggedIn:boolean = localStorage.getItem('access_token') ? true : false;
  role = localStorage.getItem('role');
  accountId = localStorage.getItem('id');
  
  ngOnInit(): void {
    this.language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en');

    if (this.accountId && this.role != Role[Role.Admin]) {
      this.chatService.countUnread().subscribe(data => {
        this.countUnread = data;
      });
    }

    setTimeout(() => {this.ngOnInit()}, 3000)
  }

  logOut(): void {
    localStorage.clear();
    
    this.isLoggedIn = false;
    this.accountId = null;
    this.role = null;
    this.router.navigate(['account/login']);
  }

  changeLanguage(language:string){
    switch(language){
      case "English":{
        localStorage.setItem('lang', 'en');
        break;
      }
      case "Українська":{
        localStorage.setItem('lang', 'ua');
        break;
      }
    }
    window.location.reload();
  }
}
