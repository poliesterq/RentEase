import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentEase.Web';

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.iconRegistry.addSvgIcon(
      `user`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/user.svg"));
      this.iconRegistry.addSvgIcon(
        `uah`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/uah.svg"));
      this.iconRegistry.addSvgIcon(
        `dollar`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/dollar.svg"));
      this.iconRegistry.addSvgIcon(
        `us`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/us.svg"));
  }
}
