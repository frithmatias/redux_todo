import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, GuardarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styles: []
})
export class TodoItemComponent implements OnInit {
	@Input() todo: Todo;
	@ViewChild('txtInputElement') txtInputElement: ElementRef;
	chkField: FormControl;
	txtInput: FormControl;
	editando: boolean;

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.chkField = new FormControl(this.todo.completado);
		this.txtInput = new FormControl(this.todo.texto, Validators.required); // el texto es obligatorio por eso los validators.
		// console.log(this.todo);

		this.chkField.valueChanges.subscribe((data) => {
			const accion = new ToggleTodoAction(this.todo.id);
			this.store.dispatch(accion);
			// console.log(data);
		});
	}

	editar() {
		this.editando = true;
		setTimeout(() => {
			// Uso un setTimeout porque a veces, la referencia al elemento se demora un instante.
			// this.txtInputElement.nativeElement.focus();
			// Mejor es el select() que selecciona todo el texto en el input.
			this.txtInputElement.nativeElement.select();
		}, 1);
	}

	finEditar() {
		this.editando = false;
		if (this.txtInput.invalid || this.txtInput.value === this.todo.texto) {
			return;
		}

		const accion = new GuardarTodoAction(this.todo.id, this.txtInputElement.nativeElement.value);
		// console.log(this.txtInputElement.nativeElement.value); // Texto nuevo ingreado en el input
		// console.log(this.txtInput.value); // Desde txtInput también puedo obtener el texto nuevo ingreado en el input
		// console.log(this.todo.texto); // Texto anterior
		console.log(accion);
		this.store.dispatch(accion);
	}

	borrar() {
		this.editando = false;
		const accion = new BorrarTodoAction(this.todo.id);
		console.log(accion);
		this.store.dispatch(accion);
	}
}
