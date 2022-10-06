import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { GalerieComponent } from "./galerie/galerie.component";
import { CarnetComponent } from "./carnet/carnet.component";
import { DestinationsComponent } from "./destinations/destinations.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'carnet', component: CarnetComponent },
  { path: 'destinations', component: DestinationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
