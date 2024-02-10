import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {

  countryData: { label: string, value: string }[] = [
    { label: 'Country', value: 'countryId' },
    { label: 'Capital', value: 'countryCapital' },
    { label: 'Region', value: 'countryRegion' },
    { label: 'Income Level', value: 'countryIncomeLevel' },
    { label: 'Latitude', value: 'latitude' },
    { label: 'Longitude', value: 'longitude' }
  ];

  @Input() latitude!: string;
  @Input() longitude!: string;
  @Input() countryId!: string;
  @Input() countryCapital!: string;
  @Input() countryRegion!: string;
  @Input() countryIncomeLevel!: string;

  constructor() { }

  ngOnInit(): void { }

}