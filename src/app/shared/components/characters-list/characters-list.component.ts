import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
	Character,
	Info
} from "../../../core/interface/rick-and-morty.interface";
import { LoadingService } from "../../../core/services/loading.service";

@Component({
	selector: "app-characters-list",
	templateUrl: "./characters-list.component.html",
	styleUrls: ["./characters-list.component.scss"]
})
export class CharactersListComponent {
	@Input() characters: Character[];
	@Input() info: Info;
	@Output() numberPage = new EventEmitter();

	public loading$ = this.loadingService.loading$;
	public page = 1;

	constructor(private readonly loadingService: LoadingService) {}

	public pageChanged($event: number) {
		this.page = $event;
		this.numberPage.emit($event);
	}
}
