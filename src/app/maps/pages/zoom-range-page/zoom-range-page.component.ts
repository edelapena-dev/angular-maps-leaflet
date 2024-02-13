import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LatLngExpression, Map, map, tileLayer } from 'leaflet';

@Component({
    templateUrl: './zoom-range-page.component.html',
    styles: `
        #map{
            width: 100vw;
            height: 100vh;
        }
        .floating-range{
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 999;
            width: 500px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
        }
        .floating-content{
            display: flex;
            align-items: center;
        }
    `
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

    @ViewChild('map') divMap?: ElementRef;
    public map?: Map;
    public currentZoom: number = 12;
    public lngLat: LatLngExpression = [-33.45694, -70.64827];

    ngAfterViewInit(): void {
        if (!this.divMap) throw ('El elemento HTML no fue encontrado.')
        this.map = map(this.divMap?.nativeElement, {
            center: this.lngLat,
            zoom: this.currentZoom,
            zoomControl: false
        });
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.mapListeners();
    }

    ngOnDestroy(): void {
        this.map?.remove();
    }

    mapListeners() {
        if (!this.map) throw "Mapa no inicializado.";

        this.map.on('zoom', (event) => {
            this.currentZoom = this.map!.getZoom();
        });

        this.map.on('zoomend', (event) => {
            if (this.map!.getZoom() < 19) return;
            this.map!.setZoom(19);
        });

        this.map.on('moveend', (event) => {
            this.lngLat = this.map!.getCenter();
        });
    }

    zoomIn() {
        this.map?.zoomIn();
    }

    zoomOut() {
        this.map?.zoomOut();
    }

    zoomChanged(value: string) {
        this.currentZoom = Number(value);
        this.map?.setZoom(this.currentZoom);
    }
}
