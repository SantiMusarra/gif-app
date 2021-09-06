import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GifsContainerComponent } from './components/gifs-container/gifs-container.component';
import { GifCardComponent } from './components/gif-card/gif-card.component';
import { FavoritesContainerComponent } from './components/favorites-container/favorites-container.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GifsContainerComponent,
    GifCardComponent,
    FavoritesContainerComponent,
    GifDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
