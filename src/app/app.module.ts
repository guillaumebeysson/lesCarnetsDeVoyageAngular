import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { SigninComponent } from './signin/signin.component';
import { GalerieComponent } from './galerie/galerie.component';
import { CarnetComponent } from './carnet/carnet.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateCarnetComponent } from './create-carnet/create-carnet.component';
import { AmeriqueComponent } from './amerique/amerique.component';
import { CarnetsComponent } from './carnets/carnets.component';
import { EuropeComponent } from './europe/europe.component';
import { AfriqueComponent } from './afrique/afrique.component';
import { AsieComponent } from './asie/asie.component';
import { OceanieComponent } from './oceanie/oceanie.component';
import { CountryComponent } from './country/country.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { ConditionsGeneralesUtilisationComponent } from './conditions-generales-utilisation/conditions-generales-utilisation.component';
import { UpdateCarnetComponent } from './update-carnet/update-carnet.component';
import { JwtService } from './services/jwt-service.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    GalerieComponent,
    CarnetComponent,
    DestinationsComponent,
    MyAccountComponent,
    CreateCarnetComponent,
    AmeriqueComponent,
    CarnetsComponent,
    EuropeComponent,
    AfriqueComponent,
    AsieComponent,
    OceanieComponent,
    CountryComponent,
    AuthComponent,
    SearchComponent,
    ConditionsGeneralesUtilisationComponent,
    UpdateCarnetComponent,
    NotFoundPageComponent,
    ForbiddenPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
