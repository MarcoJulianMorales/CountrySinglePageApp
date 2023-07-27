import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public countries: ICountry[] = [];
  public isLoading = false;
  public selectedRegion?: Region;

  constructor(private countriesService: CountryService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region): void{
    this.selectedRegion = region;
    this.isLoading=true;
    
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}