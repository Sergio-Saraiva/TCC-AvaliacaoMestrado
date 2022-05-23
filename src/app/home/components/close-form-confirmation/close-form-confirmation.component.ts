import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close-form-confirmation',
  templateUrl: './close-form-confirmation.component.html',
  styleUrls: ['./close-form-confirmation.component.scss'],
})
export class CloseFormConfirmationComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CloseFormConfirmationComponent>
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close({ close: false });
  }
}
