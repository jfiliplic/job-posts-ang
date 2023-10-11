import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  modalJobPost: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data: any) {
    this.modalJobPost = data;
  }
}
