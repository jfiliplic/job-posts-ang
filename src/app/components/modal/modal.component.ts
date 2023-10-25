import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ModalJobPost {
  title: string;
  openAt: string;
  closeAt: string;
  interviewTypes: number;
  description: string;
  notes: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  modalJobPost: ModalJobPost;

  constructor(@Inject(MAT_DIALOG_DATA) data: ModalJobPost) {
    this.modalJobPost = data;
  }
}
