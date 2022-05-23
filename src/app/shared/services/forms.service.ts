import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormQuestion } from '../models/form-question';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private formBuilder: FormBuilder) {}

  private buildPerguntasFormArray(perguntas: FormQuestion[]) {
    let formArray = this.formBuilder.array([]);
    perguntas.map((p) => {
      if (p.is_subjective === true) {
        formArray.push(
          this.formBuilder.group({
            perguntaId: new FormControl(p.id, [Validators.required]),
            optionId: new FormControl(p.options[0].id, [Validators.required]),
            is_subjective: new FormControl(true, [Validators.required]),
            subjective_answer: new FormControl('', [Validators.required]),
          })
        );
      }
      if (p.is_subjective === false) {
        formArray.push(
          this.formBuilder.group({
            perguntaId: new FormControl(p.id, [Validators.required]),
            optionId: new FormControl('', [Validators.required]),
            is_subjective: new FormControl(false, [Validators.required]),
            subjective_answer: new FormControl(null),
          })
        );
      }
    });
    return formArray;
  }

  buildTaeForm(taeId: string, perguntas: FormQuestion[], fichaId: string) {
    return this.formBuilder.group({
      fichaId: new FormControl(fichaId, [Validators.required]),
      perguntas: this.buildPerguntasFormArray(perguntas),
      taeId: new FormControl(taeId, [Validators.required]),
      docenteId: new FormControl(null),
      discenteId: new FormControl(null),
    });
  }

  buildDocenteForm(
    docenteId: string,
    perguntas: FormQuestion[],
    fichaId: string
  ) {
    return this.formBuilder.group({
      fichaId: new FormControl(fichaId, [Validators.required]),
      perguntas: this.buildPerguntasFormArray(perguntas),
      docenteId: new FormControl(docenteId, [Validators.required]),
      taeId: new FormControl(null),
      discenteId: new FormControl(null),
    });
  }

  buildDiscenteForm(
    discenteId: string,
    perguntas: FormQuestion[],
    fichaId: string
  ) {
    return this.formBuilder.group({
      fichaId: new FormControl(fichaId, [Validators.required]),
      perguntas: this.buildPerguntasFormArray(perguntas),
      discenteId: new FormControl(discenteId, [Validators.required]),
      taeId: new FormControl(null),
      docenteId: new FormControl(null),
    });
  }
}
