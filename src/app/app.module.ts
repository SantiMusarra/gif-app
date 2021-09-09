import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GifsContainerComponent } from './components/gifs-container/gifs-container.component';
import { GifCardComponent } from './components/gif-card/gif-card.component';
import { FavoritesContainerComponent } from './components/favorites-container/favorites-container.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';

//Services
import { GifManagerService } from './services/gif-manager.service';
import { FormsModule } from '@angular/forms';
import { SearchListComponent } from './components/search-list/search-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GifsContainerComponent,
    GifCardComponent,
    FavoritesContainerComponent,
    GifDetailComponent,
    SearchListComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [GifManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
