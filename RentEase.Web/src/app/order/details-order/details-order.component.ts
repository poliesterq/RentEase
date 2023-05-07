import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, tap, throwError } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Role } from 'src/app/shared/enums/role.enum';
import { Chat } from 'src/app/shared/models/chat';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';
import { ChatService } from 'src/app/shared/services/chat.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css'],
})
export class DetailsOrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private chatService: ChatService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  language = localStorage.getItem('lang') || 'en';
  role = localStorage.getItem('role');

  userId = localStorage.getItem('id');
  orderId: number;
  order: Order;

  Role = Role;
  Category = Category;

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');

    this.activatedRoute.queryParams.subscribe((params) => {
      this.orderId = params['id'];
    });

    this.orderService.getById(this.orderId).subscribe((order) => {
      this.order = order;
      this.userService.getById(order.item.landlordId).subscribe((landlord) => {
        order.item.landlord = landlord;
      });
    });
  }

  delete(id: number): void {
    this.orderService
      .delete(id)
      .pipe(
        tap(() => {
          this.snackbar.open('Order deleted succesfully', 'Close', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.router.navigate(['order']);
        })
      )
      .subscribe();
  }

  confirm(id: number): void {
    this.orderService
      .confirm(id)
      .pipe(
        tap(() => {
          this.snackbar.open('Order confirmed succesfully', 'Close', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          this.orderService.getById(this.orderId).subscribe((order) => {
            this.order = order;
            this.userService.getById(order.item.landlordId).subscribe((landlord) => {
                order.item.landlord = landlord;
              });
          });
        })
      )
      .subscribe();
  }

  openChat(userId: string) {
    this.chatService
      .getChatId(userId)
      .pipe(
        tap((chatId: string) => {
          this.router.navigate(['chat/:id'], { queryParams: { id: chatId } });
        }),
        catchError((error) => {
          if (this.userId) {
            this.userService.getById(this.userId).subscribe((currUser) => {
              this.userService.getById(userId).subscribe((interlocutor) => {
                let users: User[] = [interlocutor, currUser];

                let chat: Chat = <Chat>{
                  users: users,
                  messages: [],
                };

                this.chatService
                  .add(chat)
                  .pipe(
                    tap((result: Chat) => {
                      this.snackbar.open(
                        'Chat was created succesfully',
                        'Close',
                        {
                          duration: 1500,
                          horizontalPosition: 'right',
                          verticalPosition: 'top',
                        }
                      );
                      this.router.navigate(['chat/:id'], {
                        queryParams: { id: result.id },
                      });
                    }),
                    catchError((error) => {
                      this.snackbar.open('Something went wrong', 'Close', {
                        duration: 1500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                      });
                      return throwError(error);
                    })
                  )
                  .subscribe();
              });
            });
          }
          return throwError(error);
        })
      )
      .subscribe();
  }
}
