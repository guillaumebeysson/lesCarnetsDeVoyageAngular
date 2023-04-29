import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { GalerieComponent } from "./galerie/galerie.component";
import { CarnetComponent } from "./carnet/carnet.component";
import { DestinationsComponent } from "./destinations/destinations.component";
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateCarnetComponent } from './create-carnet/create-carnet.component';
import { AmeriqueComponent } from './amerique/amerique.component';
import { CarnetsComponent } from './carnets/carnets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'carnet', component: CarnetComponent },
  { path: 'carnets', component: CarnetsComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'myAccount', component: MyAccountComponent },
  { path: 'createCarnet', component: CreateCarnetComponent },
  { path: 'destinations/amerique', component: AmeriqueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Permet de remonter en haut de la page au changement de Link
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
