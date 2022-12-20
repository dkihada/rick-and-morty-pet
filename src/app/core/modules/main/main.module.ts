import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { MainRoutingModule } from "./main-routing.module";
import { SharedModule } from "../../../shared/shared.module";
import { FormBuilder } from "@angular/forms";

@NgModule({
	declarations: [MainComponent],
	providers: [FormBuilder],
	imports: [CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
