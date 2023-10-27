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
import { ModalComponent } from '../../components/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'home';
  subscription: Subscription | undefined;
  errorMessage: string = '';
  spinner: boolean | undefined;

  displayedColumns: string[] = ['title', 'openAt', 'closeAt', 'interviewTypes'];

  dataSource = new MatTableDataSource<JobPost>();

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchAndDisplayData();
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.title.toLowerCase().includes(filter);
    };
  }

  fetchAndDisplayData(): void {
    this.spinner = true;
    this.subscription = this.dataService
      .getData()
      .pipe(
        catchError((err) => {
          this.spinner = false;
          this.errorMessage =
            'Sorry, something went wrong, cannot display data';
          return throwError(() => err);
        })
      )
      .subscribe((response) => {
        this.spinner = false;
        this.dataSource.data = response;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  formatDate(interviewDate: Date): string {
    const transformedDate = new Date(interviewDate).toLocaleDateString(
      'slo-SI',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    );
    return transformedDate.replace(/\s/g, '');
  }

  countInterviews(interviewTypes: {}[]): number {
    return interviewTypes.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(row: JobPost): void {
    const dialogConfig = new MatDialogConfig<any>();
    dialogConfig.data = {
      title: row.title,
      openAt: this.formatDate(row.openAt),
      closeAt: this.formatDate(row.closeAt),
      interviewTypes: this.countInterviews(row.interviewTypes),
      description: row.description,
      notes: row.notes,
    };

    this.dialog.open(ModalComponent, dialogConfig);
  }
}
