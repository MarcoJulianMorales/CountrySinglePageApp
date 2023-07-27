import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: ICountry;

  constructor(
    private actvatedRoute: ActivatedRoute, 
    private router: Router,
    private countriesService: CountryService){

  }

  ngOnInit(): void {
    this.actvatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id)),
    )
    .subscribe( (country) => {
      if(!country)
        return this.router.navigateByUrl('');

      return this.country = country;
    })
  }
}
