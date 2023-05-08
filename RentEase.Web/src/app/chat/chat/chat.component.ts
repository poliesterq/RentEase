import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, tap, throwError } from 'rxjs';
import { Chat } from 'src/app/shared/models/chat';
import { Message } from 'src/app/shared/models/message';
import { User } from 'src/app/shared/models/user';
import { ChatService } from 'src/app/shared/services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService:ChatService,
    private userService:UserService,
    private translate:TranslateService,
    private activatedRoute:ActivatedRoute,
    private snackbar:MatSnackBar) { }

    accountId = localStorage.getItem('id');
    language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';

    account:User;
    chatId:string;
    chat:Chat;

    form: FormGroup = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });  

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

    if (this.accountId) {
      this.userService.getById(this.accountId).subscribe(data => {
        this.account = data;
      });
    }
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

  sendMessage(){
    if(this.form.valid){
      let message:Message = <Message>{
        text: this.message.value,
        author: this.account,
        sendTime: new Date(),
        isRead: false
      };
  
      this.chatService.sendMessage(this.chatId, message).pipe(
        tap((chat:Chat) => {
          this.chat = chat;
          window.location.reload();
        }),
        catchError(error => {
          this.snackbar.open('Something went wrong', 'Close',
          {duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'});
          return throwError(error);
        })
      ).
      subscribe();
  }
}

deleteMessage(messageId:string){
  this.chatService.deleteMessage(this.chatId, messageId).pipe(
    tap((chat:Chat) => this.chat = chat),
    catchError(error => {
      this.snackbar.open('Something went wrong', 'Close',
      {duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'});
      return throwError(error);
    })
  ).
  subscribe();
}

  get message():FormControl {
    return this.form.get('message') as FormControl;
  }
}