import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { TodoComponent } from './todo/todo.component';
import { TodosListComponent } from './todo/todos-list/todos-list.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';

// NGRX
import { StoreModule } from '@ngrx/store';
// import { todoReducer } from './todo/todo.reducer';
import { appReducers } from './app.reducers';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		TodoComponent,
		TodosListComponent,
		TodoItemComponent,
		TodoFooterComponent,
		TodoAddComponent,
		FilterPipe
	],
	imports: [
		ReactiveFormsModule,
		BrowserModule,
		StoreModule.forRoot(appReducers), // 'todos' va a ser el nombre del objeto devuelto en el observable del Store.
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production // Restrict extension to log-only mode
		})
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
