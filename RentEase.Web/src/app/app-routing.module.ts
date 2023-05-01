import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'account',
    children: [    
      {path: "login", component: LoginComponent}
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
