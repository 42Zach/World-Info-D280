import { CountryComponent } from '../country/country.component';
import { DataService } from '../../data.service';
import { Component, ElementRef, Output, EventEmitter, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  styleUrls: ['./world.component.css'],
  selector: 'app-world',
  templateUrl: './world.component.html',
})

export class WorldComponent implements AfterViewInit {

  @Output() svgIdSelected = new EventEmitter<string>();
  @Output() capitalSelected = new EventEmitter<string>();
  @Output() regionSelected = new EventEmitter<string>();
  @Output() incomeLevelSelected = new EventEmitter<string>();
  @Output() latitudeSelected = new EventEmitter<string>();
  @Output() longitudeSelected = new EventEmitter<string>();

  @ViewChild(CountryComponent) private countryInfoComponent!: CountryComponent;

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private DataService: DataService
  ) { }

  ngAfterViewInit() {
    const svgElement = this.elementRef.nativeElement.querySelector("svg");
    const pathElements = svgElement.getElementsByTagName('path');
    for (let i = 0; i < pathElements.length; i++) {
      this.renderer.listen(pathElements[i], 'mouseenter', (event) => this.handleHover(event));
    }
  }

  handleHover(event: MouseEvent) {
    const path = event.target as SVGPathElement;
    const countryId = path.id;

    this.DataService.getCountryData(countryId).subscribe((data: any) => {
      const name = data[1][0].name;
      const capitalCity = data[1][0].capitalCity;
      const region = data[1][0].region.value;
      const income = data[1][0].incomeLevel.value;
      const latitude = data[1][0].latitude;
      const longitude = data[1][0].longitude;

      this.svgIdSelected.emit(name);
      this.capitalSelected.emit(capitalCity);
      this.regionSelected.emit(region);
      this.incomeLevelSelected.emit(income);
      this.latitudeSelected.emit(latitude);
      this.longitudeSelected.emit(longitude);
    });
  }
}