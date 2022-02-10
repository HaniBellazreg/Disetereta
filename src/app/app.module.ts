import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogShiftComponent } from './dialog-shift/dialog-shift.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ShiftService } from './services/shift.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DialogShiftComponent
  ],
  entryComponents:[
    DialogShiftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [ShiftService],
  bootstrap: [AppComponent]
})
export class AppModule { }
