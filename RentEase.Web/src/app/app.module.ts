import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { DetailsComponent } from './account/details/details.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { DetailsItemComponent } from './item/details-item/details-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { ListItemComponent } from './item/list-item/list-item.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { DetailsOrderComponent } from './order/details-order/details-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';
import { ChatComponent } from './chat/chat/chat.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function tokenGetter(){
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,

    NotFoundComponent,
    UnauthorizedComponent,
    ForbiddenComponent,

    LoginComponent,
    RegistrationComponent,
    DetailsComponent,
    CreateItemComponent,
    DetailsItemComponent,
    EditItemComponent,
    ListItemComponent,
    CreateOrderComponent,
    DetailsOrderComponent,
    EditOrderComponent,
    ListOrderComponent,
    ChatListComponent,
    ChatDetailsComponent,
    ChatComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    JwtModule,

    FormsModule,
    ReactiveFormsModule,

    ScrollingModule,
    
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSliderModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7129']
      }
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
