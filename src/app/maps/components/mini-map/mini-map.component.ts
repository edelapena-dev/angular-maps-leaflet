import { InteractiveLayerOptions } from './../../../../../node_modules/@types/leaflet/index.d';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DivIcon, Map, map, marker, tileLayer } from 'leaflet';


@Component({
    selector: 'app-mini-map',
    templateUrl: './mini-map.component.html',
    styles: `
        #map{
            width: 100%;
            height: 200px;
        }
        div{
            width: 100%;
            height: 100%;
        }
    `
})
export class MiniMapComponent implements AfterViewInit {
    @Input()
    public lngLat?: [number, number];
    @ViewChild('map') divMap?: ElementRef;

    public map?: Map;
    public currentZoom: number = 16;

    ngAfterViewInit(): void {
        if (!this.divMap) throw ('El elemento HTML no fue encontrado.');
        if (!this.lngLat) throw ('LngLat can´t be null');

        this.map = map(this.divMap?.nativeElement, {
            center: this.lngLat,
            zoom: this.currentZoom,
            zoomControl: false,
            dragging: false
        });

        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

        const customMarker = `
        background-color: ${color};
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 1rem 1rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`;

        const icon = new DivIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            popupAnchor: [0, -36],
            html: `<span style="${customMarker}" />`
        })

        const mark = marker(this.lngLat, {
            draggable: true,
            icon: icon
        }).addTo(this.map);
    }
}
