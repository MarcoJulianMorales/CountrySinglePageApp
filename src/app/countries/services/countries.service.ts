import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {
    private ApiURL = 'https://restcountries.com/v3.1';

    constructor(private httpClient: HttpClient) { }

    searchCountryByAlphaCode(code: string): Observable<ICountry | null>{
        const url = `${this.ApiURL}/alpha/${code}`;
        return this.httpClient.get<ICountry[]>(url)
        .pipe(
            map(countries => countries.length > 0 ? countries[0]: null),
            catchError(() => of(null))
        );
    }
    
    searchCapital(capital: string): Observable<ICountry[]>{
        return this.httpClient.get<ICountry[]>(`${this.ApiURL}/capital/${capital}`)
        .pipe(
            catchError(error => {
                console.log(error);
                return of([]);
            })
        );
    }

    searchCountry(country: string): Observable<ICountry[]>{
        return this.httpClient.get<ICountry[]>(`${this.ApiURL}/name/${country}`)
        .pipe(
            catchError(error => {
                console.log(error);
                return of([]);
            })
        );
    }

    searchRegion(region: string): Observable<ICountry[]>{
        return this.httpClient.get<ICountry[]>(`${this.ApiURL}/region/${region}`)
        .pipe(
            catchError(error => {
                console.log(error);
                return of([]);
            })
        );
    }
}