import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, map, tileLayer } from 'leaflet';

@Component({
    templateUrl: './full-screen-page.component.html',
    styles: `
        div{
            width: 100vw;
            height: 100vh;
        }
    `
})
export class FullScreenPageComponent implements AfterViewInit {
    @ViewChild('map') divMap?: ElementRef;
    public map?: Map;

    ngAfterViewInit(): void {
        if (!this.divMap) throw ('El elemento HTML no fue encontrado.')
        this.map = map(this.divMap?.nativeElement, {
            center: [-33.45694, -70.64827],
            zoom: 12,
            zoomControl: false
        });
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

}
