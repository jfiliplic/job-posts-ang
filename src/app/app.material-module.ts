import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  exports: [MatTableModule, BrowserAnimationsModule, MatSortModule],
})
export class AppMaterialModule {}
