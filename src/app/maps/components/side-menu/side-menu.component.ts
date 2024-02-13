import { Component } from '@angular/core';

interface MenuItem {
    route: string;
    name: string;
}

@Component({
    selector: 'maps-side-menu',
    templateUrl: './side-menu.component.html',
    styles: `
        li{
            cursor: pointer;
            transition: 0.3s all;
        }
    `
})
export class SideMenuComponent {
    public menuitems: MenuItem[] = [
        { route: '/maps/fullscreen', name: 'FullScreen' },
        { route: '/maps/zoom-range', name: 'ZoomRange' },
        { route: '/maps/makers', name: 'Makers' },
        { route: '/maps/properties', name: 'Houses' },
    ];
}
