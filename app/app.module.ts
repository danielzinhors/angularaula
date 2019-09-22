import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContatosModule } from './contatos/contatos.module'
import { HttpModule} from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service'; 
import { DialogService } from './dialog.service';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],    
    providers:[
      DialogService
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {}

