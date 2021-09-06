import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesContainerComponent } from './components/favorites-container/favorites-container.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';
import { GifsContainerComponent } from './components/gifs-container/gifs-container.component';

const routes: Routes = [
  {path: '' , component: GifsContainerComponent},
  {path:'favorites' , component: FavoritesContainerComponent},
  {path: 'gif-detail' , component: GifDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
