import { Component, OnInit } from '@angular/core';
import { EvaluationForm } from 'src/app/shared/models/evaluation-form';
import { HomeService } from 'src/app/shared/services/home.service';

const ELEMENT_DATA: EvaluationForm[] = [
  {id: 1, name: 'Autoavaliação do Aluno', isAnswered: true },
  {id: 2, name: 'Avaliação Cadeira 1', isAnswered: true },
  {id: 3, name: 'Avaliação Cadeira 2', isAnswered: false },
  {id: 4, name: 'Avaliação Cadeira 3', isAnswered: false },
  {id: 5, name: 'Avaliação Cadeira 4', isAnswered: true },
  {id: 6, name: 'Avaliação Cadeira 5', isAnswered: true },
  {id: 7, name: 'Avaliação Cadeira 6', isAnswered: false },
  {id: 8, name: 'Avaliação Cadeira 7', isAnswered: true },
  {id: 9, name: 'Avaliação Cadeira 8', isAnswered: false },
  {id: 10, name: 'Avaliação Coordenação', isAnswered: true },
  {id: 11, name: 'Avaliação Orientador', isAnswered: true },
  {id: 12, name: 'Avaliação Instituição', isAnswered: true },
  {id: 13, name: 'Avaliação Biblioteca', isAnswered: true },

];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  displayedColumns: string[] = ['Avaliação', 'Respondido', 'Responder'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    // this.homeService.getAll().subscribe((data) => console.log(data));
  }

  openForm(elementId: number): void {
    console.log(elementId)
  }
}
