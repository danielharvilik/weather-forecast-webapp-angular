import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { UiHeaderComponent } from './components/ui-header/ui-header.component';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { WeatherService } from './services/weather-data.service';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UiHeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService, MessageService],
  animations: [],
})
export class AppComponent implements OnInit {
  activeRoute!: string;
  items!: MenuItem[];
  activeItem!: MenuItem;
  constructor(
    private primengConfig: PrimeNGConfig,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Table',
        icon: 'pi pi-fw pi-table',
        command: () => this.navigate('forecastTable'),
      },
      {
        label: 'Time/Temperature chart',
        icon: 'pi pi-fw pi-chart-line',
        command: () => this.navigate('temperatureChart'),
      },
      {
        label: 'Heat Index Calculator',
        icon: 'pi pi-fw pi-calculator',
        command: () => this.navigate('heatIndexCalculator'),
      },
    ];

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Get and display the active route
        this.activeRoute = this.router.url;
        console.log(this.activeRoute);
        if (this.activeRoute.includes('temperature-chart')) {
          this.activeItem = this.items[1];
        } else if (this.activeRoute.includes('heat-index-calculator')) {
          this.activeItem = this.items[2];
        } else this.activeItem = this.items[0];
      });
    this.primengConfig.ripple = true;
  }

  navigate(destination: string) {
    switch (destination) {
      case 'forecastTable': {
        this.router.navigate(['']);
        break;
      }
      case 'temperatureChart': {
        this.router.navigate(['temperature-chart']);
        break;
      }
      case 'heatIndexCalculator': {
        this.router.navigate(['heat-index-calculator']);
        break;
      }
      default: {
        break;
      }
    }
  }
}
