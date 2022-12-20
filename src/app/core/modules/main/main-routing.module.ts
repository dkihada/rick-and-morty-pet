import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { CharacterComponent } from "../../../shared/components/characters-list/character/character.component";

const routes: Routes = [
	{
		path: "",
		component: MainComponent
	},
	{
		path: ":id",
		component: CharacterComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule {}
