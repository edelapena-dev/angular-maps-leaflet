import { Component } from '@angular/core';

interface House {
    title: string;
    description: string;
    lngLat: [number, number];
}

@Component({
    templateUrl: './properties-page.component.html',
    styles: ``,
})
export class PropertiesPageComponent {
    public houses: House[] = [
        {
            title: 'Casa residencial, Canadá',
            description: 'Bella propiedad en Katana, Canadá',
            lngLat: [45.280015511264466, -75.92722289474008]
        },
        {
            title: 'Casa de playa, México',
            description: 'Hermosa casa de playa en Acapulco, México',
            lngLat: [16.828940930185748, -99.91287720907991]
        },
        {
            title: 'Apartamento, Argentina',
            description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
            lngLat: [-34.57150108832866, -58.430166677283445]
        },
        {
            title: 'Local comercial, España',
            description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
            lngLat: [40.42567285425766, -3.7112735618380177]
        },
    ];
}
