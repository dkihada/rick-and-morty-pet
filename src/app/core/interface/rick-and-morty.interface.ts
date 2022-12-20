export interface IGenderFilter {
	male: boolean;
	female: boolean;
	unknown: boolean;
}

export interface CharacterLocation {
	name: string;
	url: string;
}

export interface ResourceBase {
	id: number;
	name: string;
	url: string;
	created: string;
}

export interface Endpoints {
	character: string;
	location: string;
	episode: string;
}

export interface CharacterFilter {
	name?: string;
	type?: string;
	species?: string;
	status?: string;
	gender?: string;
	page?: number;
}

export interface LocationFilter
	extends Pick<CharacterFilter, "name" | "type" | "page"> {
	dimension?: string;
}

export interface EpisodeFilter extends Pick<CharacterFilter, "name" | "page"> {
	episode?: string;
}

export interface Character {
	id: number;
	name: string;
	status: "Dead" | "Alive" | "unknown";
	species: string;
	type: string;
	gender: "Female" | "Male" | "Genderless" | "unknown";
	image: string;
	url: string;
}

export interface Location extends ResourceBase {
	type: string;
	dimension: string;
	residents: Character[];
}

export interface Episode extends ResourceBase {
	air_date: string;
	episode: string;
	characters: string[];
}

export interface ApiResponse<T> {
	status: number;
	statusMessage: string;
	data: T;
}

export interface CharactersInfo<T> {
	characters: {
		info: Info;
		results: T;
	};
}

export interface Info {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
}
