import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DivIcon, LatLngExpression, Map, Marker, map, marker, tileLayer } from 'leaflet';

interface MarkerAndColor {
    color: string;
    marker: Marker
}

interface PlainMarker {
    color: string;
    lngLat: number[];
}

@Component({
    templateUrl: './markers-page.component.html',
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
        button{
            position: fixed;
            bottom: 30px;
            right: 20px;
            z-index: 999;
        }
        .list-group{
            position: fixed;
            top: 10px;
            right: 20px;
            cursor: pointer;
            z-index: 999;
        }
    `
})
export class MarkersPageComponent implements AfterViewInit {
    @ViewChild('map') divMap?: ElementRef;

    public markers: MarkerAndColor[] = [];

    public map?: Map;
    public currentZoom: number = 16;
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
        this.readFromLocalStorage();
    }

    createMaker() {
        if (!this.map) return;
        const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
        const latLng = this.map.getCenter();
        this.addMarker(latLng!, color);
    }


    addMarker(lngLat: LatLngExpression, color: string) {
        if (!this.map) return;

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

        const mark = marker(lngLat, {
            draggable: true,
            icon: icon
        }).addTo(this.map);

        this.markers.push({ color, marker: mark });
        this.saveToLocalStorage();
        //dragend
        mark.on('dragend', (event) => {
            this.saveToLocalStorage();
        });
    }

    deleteMarker(index: number) {
        this.markers[index].marker.remove();
        this.markers.splice(index, 1);
    }

    flyTo(marker: Marker) {
        this.map?.flyTo(marker.getLatLng(), this.currentZoom);
    }

    saveToLocalStorage() {
        const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
            return {
                color,
                lngLat: [marker.getLatLng().lat, marker.getLatLng().lng]
            }
        });
        localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
    }

    readFromLocalStorage() {
        const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
        const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

        plainMarkers.forEach(({ color, lngLat }) => {
            const coords: LatLngExpression = [lngLat[0], lngLat[1]];
            this.addMarker(coords, color);
        });
    }
}
