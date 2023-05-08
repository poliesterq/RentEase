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

  { path: 'order',
    children: [
      { path: '', component: ListOrderComponent, canActivate: [AuthenticationGuard] },
      { path: 'create/:itemId', component: CreateOrderComponent, canActivate: [AuthenticationGuard] },
      { path: 'edit/:id', component: EditOrderComponent, canActivate: [AuthenticationGuard]},
      { path: ':id', component: DetailsOrderComponent, canActivate: [AuthenticationGuard]}
    ]
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
