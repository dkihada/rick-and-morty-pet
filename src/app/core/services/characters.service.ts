import { Injectable } from "@angular/core";
import {
	BehaviorSubject,
	combineLatestWith,
	Observable,
	ReplaySubject,
	Subject,
	switchMap
} from "rxjs";
import {
	Character,
	CharactersInfo
} from "../interface/rick-and-morty.interface";
import { DataProviderService } from "../providers/data-provider.service";
import {
	allCharactersQuery,
	characterQuery
} from "../interface/qraph-query.model";
import { LoadingService } from "./loading.service";

@Injectable({
	providedIn: "root"
})
export class CharactersService {
	public character$: Observable<Character>;
	public characters$: Observable<CharactersInfo<Character[]>>;
	public filtered$: BehaviorSubject<{ gender: string; status: string }>;

	private character: BehaviorSubject<Character>;
	private characters: ReplaySubject<CharactersInfo<Character[]>>;
	private readonly requestChangePage$: BehaviorSubject<number>;
	private readonly requestCharacterById$: Subject<number>;
	private readonly requestFilteredByName$: BehaviorSubject<string>;
	private readonly requestFilteredByStatus$: BehaviorSubject<string>;
	private readonly requestFilteredByGender$: BehaviorSubject<string>;

	constructor(
		private readonly dataProviderService: DataProviderService,
		private readonly loadingService: LoadingService
	) {
		this.character = new BehaviorSubject<Character>(<Character>{});
		this.character$ = this.character.asObservable();
		this.filtered$ = new BehaviorSubject<{ gender: string; status: string }>({
			gender: "Male",
			status: "alive"
		});

		this.characters = new ReplaySubject<CharactersInfo<Character[]>>(1);
		this.characters$ = this.characters.asObservable();

		this.requestChangePage$ = new BehaviorSubject<number>(1);
		this.requestCharacterById$ = new Subject<number>();
		this.requestFilteredByName$ = new BehaviorSubject<string>("");
		this.requestFilteredByStatus$ = new BehaviorSubject<string>("alive");
		this.requestFilteredByGender$ = new BehaviorSubject<string>("Male");

		this.subscribeEmitter();
	}

	public requestChangePage(numberPage: number): void {
		this.loadingService.requestLoading(true);
		this.requestChangePage$.next(numberPage);
	}

	public requestFilterData(filter: { gender: string; status: string }): void {
		this.filtered$.next(filter);
	}

	public requestFilteredByName(name: string): void {
		this.loadingService.requestLoading(true);
		this.requestFilteredByName$.next(name);
	}

	public requestFilteredByStatus(name: string): void {
		this.loadingService.requestLoading(true);
		this.requestFilteredByStatus$.next(name);
	}

	public requestFilteredByGender(gender: string): void {
		this.loadingService.requestLoading(true);
		this.requestFilteredByGender$.next(gender);
	}

	public requestCharacterById(characterId: number): void {
		this.requestCharacterById$.next(characterId);
	}

	private getCharacters(): void {
		this.requestChangePage$
			.pipe(
				combineLatestWith(
					this.requestFilteredByName$,
					this.requestFilteredByStatus$,
					this.requestFilteredByGender$
				),
				switchMap(
					([page, name, status, gender]: [number, string, string, string]) =>
						this.dataProviderService.getCharacters(
							allCharactersQuery(page, name, status, gender)
						)
				)
			)
			.subscribe((data: CharactersInfo<Character[]>) => {
				this.characters.next(data);
				this.loadingService.requestLoading(false);
			});
	}

	private getCharacter(): void {
		this.requestCharacterById$
			.pipe(
				switchMap((id: number) =>
					this.dataProviderService.getCharacter(characterQuery(id))
				)
			)
			.subscribe(data => this.character.next(data));
	}

	private subscribeEmitter(): void {
		this.getCharacters();
		this.getCharacter();
	}
}
