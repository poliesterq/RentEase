import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  languages: string[] = ['English', 'Українська'];
  language: string | null;

  constructor(
    private translate:TranslateService
    ) { }

  ngOnInit(): void {
      this.language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';
      this.translate.addLangs(['en', 'ua']);
      this.translate.setDefaultLang('en');
      this.translate.use(localStorage.getItem("lang") || 'en');
  }
}
