import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartItem,
  BarController, PieController, ArcElement, LineController, PointElement, LineElement, DoughnutController
} from 'chart.js';
import {
  employeeComparisonConfig,
  inventoryLevelsConfig,
  revenueByCategoryConfig,
  salesOverTimeConfig,
  topSellingItemsConfig
} from "./configs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('salesOverTime') salesOverTime: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueByCategory') revenueByCategory: ElementRef<HTMLCanvasElement>;
  @ViewChild('topSellingItems') topSellingItems: ElementRef<HTMLCanvasElement>;
  @ViewChild('inventoryLevels') inventoryLevels: ElementRef<HTMLCanvasElement>;
  @ViewChild('employeeComparison') employeeComparison: ElementRef<HTMLCanvasElement>;

  constructor() {
    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      BarController,
      PieController,
      LineController,
      ArcElement,
      DoughnutController
      );
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngAfterViewInit(): void {
    this.renderChart(this.salesOverTime, salesOverTimeConfig);
    this.renderChart(this.revenueByCategory, revenueByCategoryConfig);
    this.renderChart(this.topSellingItems, topSellingItemsConfig);
    this.renderChart(this.inventoryLevels, inventoryLevelsConfig);
    this.renderChart(this.employeeComparison, employeeComparisonConfig);
  }

  renderChart(chart:ElementRef<HTMLCanvasElement>,config : any): void {
    if (chart && chart.nativeElement) {
      const ctx: ChartItem = chart.nativeElement;
      new Chart(ctx,config);
    }
  }
}
