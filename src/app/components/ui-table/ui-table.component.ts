import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IForecastData, ITableColumn } from '../../models/models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [CommonModule, TableModule, HttpClientModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
})
export class UiTableComponent {
  @Input() forecastData!: IForecastData[];
  @Input() tableCols!: ITableColumn[]

  constructor() {}

  ngOnInit() {
    
  }

}
