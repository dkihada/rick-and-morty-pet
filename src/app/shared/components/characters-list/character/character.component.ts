import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Observable, Subject, take, takeUntil } from "rxjs";
import { CharactersService } from "../../../../core/services/characters.service";
import { Character } from "../../../../core/interface/rick-and-morty.interface";
import { Location } from "@angular/common";

@Component({
	selector: "app-character",
	templateUrl: "./character.component.html",
	styleUrls: ["./character.component.scss"]
})
export class CharacterComponent implements OnDestroy {
	public character$: Observable<Character> = this.charactersService.character$;

	private destroy$: Subject<void>;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly charactersService: CharactersService,
		private readonly location: Location
	) {
		this.destroy$ = new Subject<void>();
		this.activatedRoute.params.pipe(take(1)).subscribe(({ id }) => {
			this.charactersService.requestCharacterById(id);
		});
	}

	previousPage() {
		this.location.back();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
