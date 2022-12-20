import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Apollo } from "apollo-angular";
import {
	Character,
	CharactersInfo
} from "../interface/rick-and-morty.interface";

@Injectable({
	providedIn: "root"
})
export class DataProviderService {
	constructor(private apollo: Apollo) {}

	public getCharacters(query: any): Observable<CharactersInfo<Character[]>> {
		return this.apollo
			.query<CharactersInfo<Character[]>>({ query })
			.pipe(map(({ data }) => data));
	}

	public getCharacter(query: any): Observable<Character> {
		return this.apollo
			.query<{ character: Character }>({ query })
			.pipe(map(({ data }) => data.character));
	}
}
