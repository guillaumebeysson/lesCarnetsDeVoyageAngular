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
import { UpdateCarnetComponent } from './update-carnet/update-carnet.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'carnets/:id', component: CarnetComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'carnets/randomCarnet', component: CarnetComponent },
  { path: 'carnets', component: CarnetsComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'myAccount/:nom', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'createCarnet', component: CreateCarnetComponent, canActivate: [AuthGuard] },
  { path: 'updateCarnet/:id', component: UpdateCarnetComponent },
  { path: 'destinations/amerique', component: AmeriqueComponent },
  { path: 'destinations/europe', component: EuropeComponent },
  { path: 'destinations/afrique', component: AfriqueComponent },
  { path: 'destinations/asie', component: AsieComponent },
  { path: 'destinations/oceanie', component: OceanieComponent },
  { path: 'carnets/country/:country', component: CountryComponent },
  { path: 'search', component: SearchComponent},
  { path: 'cgu', component: ConditionsGeneralesUtilisationComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: '403', component: ForbiddenPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Permet de remonter en haut de la page au changement de Link
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
