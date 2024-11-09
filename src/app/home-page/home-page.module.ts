import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        NgOptimizedImage,
        MatIconModule
    ]
})
export class HomePageModule { }
