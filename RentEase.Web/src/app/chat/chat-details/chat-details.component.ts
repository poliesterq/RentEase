import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Chat } from 'src/app/shared/models/chat';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit {

  constructor(private chatService:ChatService,
    private translate:TranslateService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

    language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';

    accountId = localStorage.getItem('id');
    chatId:string;
    chat:Chat;

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en'); 

    this.activatedRoute
    .queryParams
    .subscribe(params =>
      this.chatId = params['id']);
    
    this.chatService.getByChatId(this.chatId).subscribe(data => {
      this.chat = data;
    });
  }

  getChatName():string{
    if (this.chat.title){
      return this.chat.title;
    }

    let result:String[] = [];

    this.chat.users.forEach(user => {
      if(user.id != this.accountId){
        result.push(`${user.firstName} ${user.lastName}`);
      }
    });

    return result.join(', ');
  }

  leave(chatId?:string){
    if(chatId){
      this.chatService.leaveChat(chatId).subscribe(
        () => { this.router.navigate(['/chat']); }
      );
    }
  }
}