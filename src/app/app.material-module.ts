import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [MatTableModule, BrowserAnimationsModule],
})
export class AppMaterialModule {}
