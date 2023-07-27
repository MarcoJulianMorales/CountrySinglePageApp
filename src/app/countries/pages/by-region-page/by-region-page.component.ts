import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: ICountry[] = [];

  constructor(private countriesService: CountryService){

  }

  searchByRegion(region: string): void{
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        console.log(countries)
      });
  }
}