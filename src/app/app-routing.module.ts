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
import { EuropeComponent } from './europe/europe.component';
import { AfriqueComponent } from './afrique/afrique.component';
import { AsieComponent } from './asie/asie.component';
import { OceanieComponent } from './oceanie/oceanie.component';
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
  { path: 'destinations/europe', component: EuropeComponent },
  { path: 'destinations/afrique', component: AfriqueComponent },
  { path: 'destinations/asie', component: AsieComponent },
  { path: 'destinations/oceanie', component: OceanieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Permet de remonter en haut de la page au changement de Link
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
