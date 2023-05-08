import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/shared/enums/category.enum';
import { CategoryStatistic } from 'src/app/shared/models/category-statistic';
import { ExpenseStatistic } from 'src/app/shared/models/expense-statistic';
import { OrderStatistic } from 'src/app/shared/models/order-statistic';
import { StatisticService } from 'src/app/shared/services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit {
  constructor(
    private statisticService:StatisticService,
    private translate: TranslateService
    ) {}

  Category = Category;
  language = localStorage.getItem("lang") || 'en';
  role = localStorage.getItem("role");
  
  userId = localStorage.getItem("id") || '';

  categorySet:any[];
  expenseSet:any[];
  orderSet:any[];

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#4a4cf6', '#575ef7', '#91b3fa', '#fe7062', '#ff8077', '#9370DB']
  };

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');

    //tenant
    this.statisticService.getExpense(this.userId).subscribe((data:ExpenseStatistic[]) => {
      this.expenseSet = data.map((statistic) => ({
        name: Category[statistic.category],
        series: [
          {name: 'US', value: statistic.expenseUS},
          {name: 'UA', value: statistic.expenseUA}
        ]
        }));
    });

    this.statisticService.getOrder(this.userId).subscribe((data:OrderStatistic[]) => {
      this.orderSet = data.map((statistic) => ({
        name: this.language == 'en' ? 'Order count: ' : 'Кількість замовлень: ',
        series: [
          {name: new Date(statistic.dateFrom).toLocaleDateString('en-US'), value: statistic.orders.length},
          {name: new Date(statistic.dateTo).toLocaleDateString('en-US'), value: statistic.orders.length}
        ]
        }));
    });

    this.statisticService.getCategory(this.userId).subscribe((data:CategoryStatistic[]) => {
       this.categorySet = data.map((statistic) => ({
        name: Category[statistic.category],
        value: statistic.count,
        }));
    });
  }
}
