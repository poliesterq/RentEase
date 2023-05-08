import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/shared/enums/role.enum';
import { Chat } from 'src/app/shared/models/chat';
import { Message } from 'src/app/shared/models/message';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  constructor(private chatService:ChatService,
    private translate:TranslateService,
    private snackbar:MatSnackBar) { }

    Role = Role;
    
    role = localStorage.getItem('role'); 
    accountId = localStorage.getItem('id');
    language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';

    chats:Chat[];

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en'); 
    
    this.chatService.getByUserId().subscribe(data => {
      this.chats = data;
    });
  }
  
  deleteChat(chatId?: string){
    if (chatId === undefined) {
      return;
    }
    
    this.chatService.delete(chatId).subscribe(
      () => {
        window.location.reload();
      },
      () => {
        this.snackbar.open('Please fill out all nedded information', 'Close',
        {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
      }
    )
  }

  getChatName(chat:Chat):string{
    if (chat.title){
      return chat.title;
    }

    let result:String[] = [];

    chat.users.forEach(user => {
      if(user.id != this.accountId){
        result.push(`${user.firstName} ${user.lastName}`);
      }
    });

    return result.join(', ');
  }

  getLastMessage(chat:Chat):Message | undefined{
    let length = chat.messages?.length;

    if(length){
      return chat.messages?.[length - 1];
    }

    return undefined;
  }

  getSender(message:Message):string{
    return message.author.id === this.accountId ? 'You' : message.author.firstName; 
  }
}