import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, JobPost } from '../../services/data.service';
import { catchError, throwError, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'home';
  data: JobPost[] = [];
  subscription: Subscription = new Subscription();
  errorMessage: string = '';

  displayedColumns: any[] = ['title', 'openAt', 'closeAt', 'interviewTypes'];

  dataSource = new MatTableDataSource<JobPost>();

  constructor(private dataService: DataService) {}

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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
