import { ICountry } from "./country.interface";
import { Region } from "./region.type";

export interface ICacheStore {
    byCapital: ISearchCountries;
    byCountry: ISearchCountries;
    byRegion:  IRegionCountries;
}

export interface ISearchCountries {
    search: string;
    countries: ICountry[]
}

export interface IRegionCountries {
    region: Region;
    countries: ICountry[]
}