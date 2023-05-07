import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http:HttpClient) { }

  readonly baseUrl = environment.baseUrl + 'Chat';

  getByUserId():Observable<Chat[]>{
    return this.http.get<Chat[]>(`${this.baseUrl}/All`);
  }

  getByChatId(id:string):Observable<Chat>{
    return this.http.get<Chat>(`${this.baseUrl}/ChatId/${id}`);
  }

  getChatId(userId:string):Observable<string>{
    //TODO: fix responce for error
    let headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')

    return this.http.get(`${this.baseUrl}/UserId/${userId}`, {headers, responseType: 'text'});
  }

  countUnread():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/CountUnread`);
  }

  add(chat:Chat):Observable<Chat>{
    return this.http.post<Chat>(this.baseUrl, chat);
  }

  delete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  leaveChat(chatId:string):Observable<boolean>{
    let httpParams = new HttpParams().append('chatId', chatId);
    return this.http.put<boolean>(`${this.baseUrl}/LeaveChat/${chatId}`, {httpParams});
  }

  sendMessage(chatId:string, message:Message):Observable<Chat>{
    return this.http.put<Chat>(
      `${this.baseUrl}/SendMessage`, 
      {
        chatId: chatId,
        message: message
      });
  }
  
  deleteMessage(chatId:string, messageId:string):Observable<Chat>{
    return this.http.put<Chat>(
      `${this.baseUrl}/DeleteMessage`, 
      {
        chatId: chatId,
        messageId: messageId
      });
  }
}