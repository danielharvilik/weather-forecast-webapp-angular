import { Component, Inject, Input, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-header',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './ui-header.component.html',
  styleUrl: './ui-header.component.scss',
})
export class UiHeaderComponent implements OnInit {
  constructor(@Inject(Router) private router: Router) {}

  @Input() items!: MenuItem[];

  @Input() activeItem!: MenuItem;

  ngOnInit() {}
}
