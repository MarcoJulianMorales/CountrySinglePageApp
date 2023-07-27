import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../interfaces/country.interface';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  public countries: ICountry[] = [];
  public initialSearchTxt: string = '';
  public isLoading = false;

  constructor(private countriesService: CountryService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialSearchTxt = this.countriesService.cacheStore.byCountry.search;
  }

  searchByCountry(country: string): void{
    this.isLoading = true;
    this.countriesService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading=false;
      });
  }
}