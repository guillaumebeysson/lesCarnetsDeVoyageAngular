import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { GalerieComponent } from "./galerie/galerie.component";
import { CarnetComponent } from "./carnet/carnet.component";
import { DestinationsComponent } from "./destinations/destinations.component";
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateCarnetComponent } from './create-carnet/create-carnet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'carnet', component: CarnetComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'myAccount', component: MyAccountComponent },
  { path: 'createCarnet', component: CreateCarnetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Permet de remonter en haut de la page au changement de Link
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
