import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: ICountry[] = [];

  constructor(private countriesService: CountryService){

  }

  searchByCapital(capital: string): void{
    this.countriesService.searchCapital(capital)
      .subscribe(countries => {
        this.countries = countries;
        console.log(countries)
      });
  }
}