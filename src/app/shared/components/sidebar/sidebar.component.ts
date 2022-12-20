import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CharactersService } from "../../../core/services/characters.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
	public filterForm: FormGroup;

	private readonly destroy$: Subject<void>;

	constructor(private readonly charactersService: CharactersService) {
		const { gender, status } = this.charactersService.filtered$.value;

		this.filterForm = new FormGroup({
			gender: new FormControl(gender),
			status: new FormControl(status)
		});

		this.destroy$ = new Subject<void>();
	}

	ngOnInit(): void {
		this.filterForm.valueChanges.subscribe(({ gender, status }) => {
			this.charactersService.requestFilteredByStatus(status);
			this.charactersService.requestFilteredByGender(gender);
			this.charactersService.requestFilterData({ gender, status });
		});
	}

	public filterName($event: Event): void {
		const value = ($event.currentTarget as HTMLInputElement).value;
		this.charactersService.requestFilteredByName(value);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
