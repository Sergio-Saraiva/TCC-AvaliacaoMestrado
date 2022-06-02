import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EvaluationFormModalData } from 'src/app/shared/models/evaluation-form-modal-data';
import { FormQuestion } from 'src/app/shared/models/form-question';
import { Option } from 'src/app/shared/models/options';
import { UserInformation } from 'src/app/shared/models/user-information';
import { OrderBy } from 'src/app/shared/odata-query-maker/enums/order-by';
import { ODataQueryMaker } from 'src/app/shared/odata-query-maker/odata-query-maker';
import { AnswersService } from 'src/app/shared/services/answers.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { OptionsService } from 'src/app/shared/services/options.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss'],
})
export class EvaluationFormComponent implements OnInit {
  options: Option[] = [];
  formGroup: FormGroup;
  user: UserInformation;
  constructor(
    private dialogRef: MatDialogRef<EvaluationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EvaluationFormModalData,
    private optionsService: OptionsService,
    private userService: UserService,
    private answerService: AnswersService,
    private formsService: FormsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserInformation();
    this.optionsService.getAll(this.buildQuery()).subscribe((data) => {
      this.options = data.user;
      this.data.formQuestions.map((fQ) => {
        this.fillFormQuesionOptions(fQ);
      });
      this.buildForm(this.user.type, this.data.formQuestions);
    });
  }

  private fillFormQuesionOptions(fQ: FormQuestion) {
    fQ.options = this.optionsService.getOptionFromPeruntaId(
      fQ.id,
      this.options
    );
  }

  private buildForm(userType: string, perguntas: FormQuestion[]) {
    if (userType === 'docente') {
      this.formGroup = this.formsService.buildDocenteForm(
        this.user.id,
        perguntas,
        this.data.formId
      );
    } else if (userType === 'tae') {
      this.formGroup = this.formsService.buildTaeForm(
        this.user.id,
        perguntas,
        this.data.formId
      );
    } else if (userType === 'discente') {
      this.formGroup = this.formsService.buildDiscenteForm(
        this.user.id,
        perguntas,
        this.data.formId
      );
    } else if (userType === 'admin') {
      this.formGroup = this.formsService.buildDocenteForm(
        this.user.id,
        perguntas,
        this.data.formId
      );
    }
  }

  buildQuery(): string {
    const query = new ODataQueryMaker()
      .filter((f) => f.filter('opcoes', ''))
      .range(0, Number.MAX_SAFE_INTEGER)
      .sort('id', OrderBy.Asc)
      .generate();

    return query;
  }

  submitForm() {
    this.answerService.create(this.formGroup.value).subscribe(
      (data) => console.log('retorno da resposta', data),
      (error) => console.log(error),
      () => {
        this.dialogRef.close({ formId: this.data.formId });
      }
    );
  }

  close() {
    const result = window.confirm(
      'Suas respostas não serão salvas se sair sem submeter o formulário. Tem certeza disso?'
    );

    if (result === true) {
      this.dialogRef.close({ formId: null });
    }
  }
}
