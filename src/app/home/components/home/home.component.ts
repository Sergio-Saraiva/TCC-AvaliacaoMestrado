import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EvaluationForm } from 'src/app/shared/models/evaluation-form';
import { FormAnswerResponse } from 'src/app/shared/models/form-answer-response';
import { FormQuestion } from 'src/app/shared/models/form-question';
import { UserInformation } from 'src/app/shared/models/user-information';
import { OrderBy } from 'src/app/shared/odata-query-maker/enums/order-by';
import { ODataQueryMaker } from 'src/app/shared/odata-query-maker/odata-query-maker';
import { AnswersService } from 'src/app/shared/services/answers.service';
import { EvaluationFormService } from 'src/app/shared/services/evaluation-forms.service';
import { FormQuestionService } from 'src/app/shared/services/form-question.service';
import { UserService } from 'src/app/shared/services/user.service';
import { EvaluationFormComponent } from '../evaluation-form/evaluation-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'Avaliação',
    'Respondido',
    'Responder',
    'Publicacao',
  ];
  evaluationForms: EvaluationForm[] = [];
  dataSource = new MatTableDataSource<EvaluationForm>();
  formQuestions: FormQuestion[] = [];
  user: UserInformation;
  answers: FormAnswerResponse[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private evaluationFormService: EvaluationFormService,
    private formQuestionService: FormQuestionService,
    private userService: UserService,
    private answerService: AnswersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserInformation();
    this.getAllForms();
  }

  private getAllForms() {
    this.getAnswers();
    this.getAllFormQuestions();
    this.evaluationFormService.getAll(this.buildQuery()).subscribe((data) => {
      data.user.map((eF) => {
        this.fillFormQuestions(eF);
        this.getAnsweredForms(eF);
      });
      this.evaluationForms = data.user;
      this.dataSource.data = this.evaluationForms;
      this.dataSource.paginator = this.paginator;
    });
  }

  private getAllFormQuestions() {
    this.formQuestionService
      .getAll(this.buildQueryForFormQuestions())
      .subscribe((data) => (this.formQuestions = data.user));
  }

  private getAnswers() {
    this.answerService
      .getAll(this.buildQueryForFormQuestionsAnswers())
      .subscribe((data) => {
        this.answers = data.user;
      });
  }

  private getUserInformation() {
    this.user = this.userService.getUserInformation();
  }

  private getAnsweredForms(eF: EvaluationForm) {
    eF.isAnswered = this.evaluationFormService.getIsFormAnswered(
      eF,
      this.user,
      this.answers
    );
  }

  private fillFormQuestions(eF: EvaluationForm) {
    eF.perguntas = this.formQuestionService.groupQuestionByFormId(
      eF.id,
      this.formQuestions
    );
  }

  buildQueryForFormQuestionsAnswers(): string {
    const query = new ODataQueryMaker()
      .filter((f) => f.filter('respostas', ''))
      .range(0, Number.MAX_SAFE_INTEGER)
      .sort('id', OrderBy.Asc)
      .generate();

    return query;
  }

  buildQueryForFormQuestions(): string {
    const query = new ODataQueryMaker()
      .filter((f) => f.filter('pergunta', ''))
      .range(0, Number.MAX_SAFE_INTEGER)
      .sort('id', OrderBy.Asc)
      .generate();

    return query;
  }

  buildQuery(): string {
    const query = new ODataQueryMaker()
      .filter((f) => f.filter('name', '').filter('id', ''))
      .range(0, Number.MAX_SAFE_INTEGER)
      .sort('id', OrderBy.Desc)
      .generate();

    return query;
  }

  openForm(elementId: string): void {
    let selectedForm = this.evaluationForms.filter(
      (eF) => eF.id === elementId
    )[0];

    const dialogRef = this.dialog.open(EvaluationFormComponent, {
      width: '70%',
      data: {
        formId: selectedForm.id,
        formTitle: selectedForm.name,
        formQuestions: selectedForm.perguntas,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.formId !== null) {
        this.evaluationForms.map((eF) => {
          if (eF.id === data.formId) {
            eF.isAnswered = true;
          }
        });
      }
    });
  }
}
