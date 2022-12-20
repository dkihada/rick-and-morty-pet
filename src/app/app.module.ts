import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { GraphQLModule } from "./graphql.module";
import { MainModule } from "./core/modules/main/main.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule,
		GraphQLModule,
		MainModule,
		NgxPaginationModule
	],
	providers: [HttpClient],
	bootstrap: [AppComponent]
})
export class AppModule {}
