import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToggleAllTodoAction } from './todo.actions';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styles: []
})
export class TodoComponent implements OnInit {
	@ViewChild('chkAll') chkAll: ElementRef;

	constructor(private store: Store<AppState>) {}

	ngOnInit() {}

	toggleAll() {
		console.log(this.chkAll.nativeElement.checked);
		const action = new ToggleAllTodoAction(this.chkAll.nativeElement.checked);
		this.store.dispatch(action);
	}
}
