import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()

export class DataService {
/* BehaviorSubject class represents a value that changes over time. Observers 
can subscribe to the subject to receive the last (or initial) value and all subsequent notifications. */
  private goals = new BehaviorSubject<any>(['The initial goal', 'Another silly life goal']);
  goal = this.goals.asObservable();

  constructor() { }

  /* se pasa un array como argumento con un nuevo valor (se llama al agregar o eliminar) 
  usado para actualizar el valor de la variable en el service
  y se mueve al siguiente nodo? */
  changeGoal(goal) {
    this.goals.next(goal);
    console.log('cambio goals en service');
  }
}
