import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DataService, JobPost } from '../../services/data.service';
import { catchError, throwError, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'home';
  data: JobPost[] = [];
  subscription: Subscription = new Subscription();
  errorMessage: string = '';

  displayedColumns: string[] = ['title', 'openAt', 'closeAt', 'interviewTypes'];

  dataSource = new MatTableDataSource<JobPost>();

  constructor(private dataService: DataService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription = this.dataService
      .getData()
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Something went wrong';
          return throwError(() => err);
        })
      )
      .subscribe((response) => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      });

    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.title.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatDate(interviewDate: Date): string {
    const date = new Date(interviewDate);
    const yearOfDate = date.getFullYear();
    const monthOfDate = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayOfDate = date.getDate().toString().padStart(2, '0');
    return [dayOfDate, monthOfDate, yearOfDate].join('.');
  }

  countInterviews(interviewTypes: []): number {
    return interviewTypes.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
