import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvaluationFormModalData } from 'src/app/shared/models/evaluation-form-modal-data';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss']
})
export class EvaluationFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: EvaluationFormModalData) {}

  ngOnInit(): void {
  }

}
