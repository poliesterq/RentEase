import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/shared/models/chat';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit {

  constructor(private chatService:ChatService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

    accountId = localStorage.getItem('id');
    chatId:string;
    chat:Chat;

  ngOnInit(): void {
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