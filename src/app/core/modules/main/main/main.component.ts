import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import {
	Character,
	CharactersInfo,
	Info
} from "../../../interface/rick-and-morty.interface";
import { CharactersService } from "../../../services/characters.service";
import { LoadingService } from "../../../services/loading.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {
	public characters: Character[];
	public info: Info;
	public numberPage: any;

	private readonly destroy$: Subject<void>;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly charactersService: CharactersService,
		private readonly loadingService: LoadingService
	) {
		this.destroy$ = new Subject<void>();
	}

	ngOnInit(): void {
		this.charactersService.characters$
			.pipe(takeUntil(this.destroy$))
			.subscribe((data: CharactersInfo<Character[]>) => {
				this.characters = data.characters.results;
				this.info = data.characters.info;
				this.loadingService.requestLoading(false);
			});
	}

	public changePage = (pageNumber: number) => {
		this.charactersService.requestChangePage(pageNumber);
	};

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
