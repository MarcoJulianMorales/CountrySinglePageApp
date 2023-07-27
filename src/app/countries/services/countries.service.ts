import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { ICacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {
    private ApiURL = 'https://restcountries.com/v3.1';

    public cacheStore: ICacheStore = {
        byCapital: {search: '', countries: [] },
        byCountry: {search: '', countries: [] },
        byRegion:  {region: '', countries: [] },
    }

    constructor(private httpClient: HttpClient) { 
        this.loadCacheStoreFromLocalStorage();
    }

    private saveToLocalStorage(): void{
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadCacheStoreFromLocalStorage(): void{
        if(!localStorage.getItem('cacheStore'))
            return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

    private getCountriesRequest(url: string): Observable<ICountry[]>{
        return this.httpClient.get<ICountry[]>(url)
        .pipe(
            catchError(error => {
                console.log(error);
                return of([]);
            }),
            delay(500),
        );
    }

    searchCountryByAlphaCode(code: string): Observable<ICountry | null>{
        const url = `${this.ApiURL}/alpha/${code}`;
        return this.httpClient.get<ICountry[]>(url)
        .pipe(
            map(countries => countries.length > 0 ? countries[0]: null),
            catchError(() => of(null))
        );
    }
    
    searchCapital(capital: string): Observable<ICountry[]>{ 
        const url = `${this.ApiURL}/capital/${capital}`
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCapital = {search: capital, countries}),
            tap( () => this.saveToLocalStorage()),
        );
    }

    searchCountry(country: string): Observable<ICountry[]>{
        const url = `${this.ApiURL}/name/${country}`
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCountry = {search: country, countries}),
            tap( () => this.saveToLocalStorage()),
        );
    }

    searchRegion(region: Region): Observable<ICountry[]>{
        const url = `${this.ApiURL}/region/${region}`
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byRegion = { region, countries}),
            tap( () => this.saveToLocalStorage()),
        );
    }
}