import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from 'src/app/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChoseNameComponent } from '../app/chose-name/chose-name.component';
import { MatDialogModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { PlayAgainComponent } from './play-again/play-again.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ChoseNameComponent,
    PlayAgainComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ChoseNameComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
