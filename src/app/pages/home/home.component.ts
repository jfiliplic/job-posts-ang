import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, JobPost } from '../../services/data.service';
import { catchError, throwError, Subscription } from 'rxjs';

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
        this.data = response;
        console.log(this.data);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
