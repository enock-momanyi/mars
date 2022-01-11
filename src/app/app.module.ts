import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoverManifestComponent } from './rover-manifest/rover-manifest.component';

import { ManifestService } from './manifest.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ViewPhotoComponent } from './view-photo/view-photo.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound.component';
import { WelcomeComponent } from './welcome/welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    RoverManifestComponent,
    FormComponent,
    ViewPhotoComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:WelcomeComponent, pathMatch:'full'},
      {path: 'rover/:roverName', component: RoverManifestComponent, pathMatch:'full'},
    {path: 'rover/:roverName/:sol/:camName', component: ViewPhotoComponent, pathMatch:'full'},
    {path:'**', component: PageNotFoundComponent}
    ]),
    FormsModule,
  ],
  providers: [ManifestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
