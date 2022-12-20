import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class LoadingService {
	public loading$: Observable<boolean>;

	private loading: BehaviorSubject<boolean>;

	constructor() {
		this.loading = new BehaviorSubject<boolean>(true);
		this.loading$ = this.loading.asObservable();
	}

	public requestLoading(value: boolean): void {
		this.loading.next(value);
	}
}
