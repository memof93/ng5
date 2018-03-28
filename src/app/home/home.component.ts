import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
   trigger('triggerName', [
     transition('* => *', [
       query(':enter', style({opacity: 0}), {optional: true}),
       
       query(':enter', stagger('300ms', [
         animate('.6s ease-in', keyframes([
           style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
           style({opacity: .5, transform: 'translateY(35%)', offset: .3}),
           style({opacity: 1, transform: 'translateY(0)', offset: 1})
         ]))]), {optional: true}),

       query(':leave', stagger('300ms', [
         animate('.6s ease-in', keyframes([
           style({opacity: 1, transform: 'translateY(0)', offset: 0}),
           style({opacity: .5, transform: 'translateY(35%)', offset: .3}),
           style({opacity: 0, transform: 'translateY(-75%)', offset: 1})
         ]))]), {optional: true}),
  
         
     ])
   ])
  ]
})
export class HomeComponent implements OnInit {
  //itemCount = 5;
  //en typeScript definimos el tipo de dato
  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = [];

  constructor(private _data: DataService) { }

  //this would be run when the component is loaded
  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res); //asigno el valor del service a la variable local goals
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  /* goalText lo uso para almacenar el valor del nuevo elemento que se agregará al array de goals
    necesito que sea two-way binding para poder manipular lo que el usuario ingrese en el input, de otro 
    modo sólo podría leer lo que ya está definido aquí (como btnText) 
  */
  addItem() {
    //if the input is not empty
    if (!(/^\s*$/.test(this.goalText))) {
      this.goals.push(this.goalText);
    }
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);

  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
