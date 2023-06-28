import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, MatTreeModule, MatIconModule, MatButtonModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
