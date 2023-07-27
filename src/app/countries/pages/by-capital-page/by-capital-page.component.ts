import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public countries: ICountry[] = [];
  public initialSearchTxt: string = '';
  public isLoading = false;

  constructor(private countriesService: CountryService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialSearchTxt = this.countriesService.cacheStore.byCapital.search;
  }

  searchByCapital(capital: string): void{
    this.isLoading = true;
    this.countriesService.searchCapital(capital)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}