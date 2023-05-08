import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { DetailsComponent } from './account/details/details.component';
import { AuthenticationGuard } from './guards/authentication.quard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { DetailsItemComponent } from './item/details-item/details-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { ListItemComponent } from './item/list-item/list-item.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { DetailsOrderComponent } from './order/details-order/details-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { ChatComponent } from './chat/chat/chat.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';
import { Role } from './shared/enums/role.enum';
import { UserListComponent } from './user-list/user-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'account',
    children: [    
      { path: "login", component: LoginComponent},
      { path: "registration", component: RegistrationComponent},
      { path: "details", component: DetailsComponent, canActivate: [AuthenticationGuard]}
    ]
  },

  { path: 'item', 
    children: [
      { path: '', component: ListItemComponent },
      { path: 'create', component: CreateItemComponent, canActivate: [AuthenticationGuard]},
      { path: 'edit/:id', component: EditItemComponent, canActivate: [AuthenticationGuard]},
      { path: ':id', component: DetailsItemComponent }
    ]
  },

  { path: 'order', canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: ListOrderComponent },
      { path: 'create/:itemId', component: CreateOrderComponent},
      { path: 'edit/:id', component: EditOrderComponent},
      { path: ':id', component: DetailsOrderComponent}
    ]
  },

  { path: 'chat', canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: ChatListComponent },
      { path: ':id', component: ChatComponent },
      { path: 'details/:id', component: ChatDetailsComponent }
    ]
  },

  { path: 'statistic', canActivate: [AuthenticationGuard], component: StatisticComponent },
  
  { 
    path: 'admin/user', 
    canActivate: [AuthenticationGuard],
    data: { roles : [Role[Role.Admin]]}, 
    component: UserListComponent
  },

  { path: 'notfound', component: NotFoundComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
