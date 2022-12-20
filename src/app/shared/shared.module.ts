import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { CharactersListComponent } from "./components/characters-list/characters-list.component";
import { NgxPaginationModule } from "ngx-pagination";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CharacterComponent } from "./components/characters-list/character/character.component";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [
		HeaderComponent,
		CharactersListComponent,
		SidebarComponent,
		CharacterComponent
	],
	exports: [HeaderComponent, CharactersListComponent, SidebarComponent],
	imports: [
		CommonModule,
		NgxPaginationModule,
		ReactiveFormsModule,
		RouterModule
	]
})
export class SharedModule {}
