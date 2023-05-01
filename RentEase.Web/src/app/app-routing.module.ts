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

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'account',
    children: [    
      { path: "login", component: LoginComponent},
      { path: "registration", component: RegistrationComponent},
      { path: "details", component: DetailsComponent, canActivate: [AuthenticationGuard]}
    ]
  },

  { path: 'notfound', component: NotFoundComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
