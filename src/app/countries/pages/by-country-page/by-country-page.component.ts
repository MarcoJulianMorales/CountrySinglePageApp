import { Component } from '@angular/core';
import { ICountry } from '../../interfaces/country.interface';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries: ICountry[] = [];

  constructor(private countriesService: CountryService){

  }

  searchByCountry(country: string): void{
    this.countriesService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
        console.log(countries)
      });
  }
}