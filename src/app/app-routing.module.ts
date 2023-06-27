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
import { CountryComponent } from './country/country.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { ConditionsGeneralesUtilisationComponent } from './conditions-generales-utilisation/conditions-generales-utilisation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'carnets/:id', component: CarnetComponent, canActivate: [AuthGuard] },
  { path: 'galerie', component: GalerieComponent, canActivate: [AuthGuard] },
  { path: 'carnets/randomCarnet', component: CarnetComponent, canActivate: [AuthGuard] },
  { path: 'carnets', component: CarnetsComponent, canActivate: [AuthGuard] },
  { path: 'destinations', component: DestinationsComponent, canActivate: [AuthGuard] },
  { path: 'myAccount/:nom', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'createCarnet', component: CreateCarnetComponent, canActivate: [AuthGuard] },
  { path: 'destinations/amerique', component: AmeriqueComponent, canActivate: [AuthGuard] },
  { path: 'destinations/europe', component: EuropeComponent, canActivate: [AuthGuard] },
  { path: 'destinations/afrique', component: AfriqueComponent, canActivate: [AuthGuard] },
  { path: 'destinations/asie', component: AsieComponent, canActivate: [AuthGuard] },
  { path: 'destinations/oceanie', component: OceanieComponent, canActivate: [AuthGuard] },
  { path: 'carnets/country/:country', component: CountryComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'cgu', component: ConditionsGeneralesUtilisationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Permet de remonter en haut de la page au changement de Link
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
