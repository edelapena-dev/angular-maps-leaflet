import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
    route: string;
    name: string;
}

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
    selector: 'side-menu',
    templateUrl: './side-menu.component.html',
    styles: `
        li{
            cursor: pointer;
            transition: 0.3s all;
        }
        ul{
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 999;
        }
    `
})
export class SideMenuComponent {
    public menuitems: MenuItem[] = [
        { route: '/maps/fullscreen', name: 'FullScreen' },
        { route: '/maps/zoom-range', name: 'ZoomRange' },
        { route: '/maps/makers', name: 'Makers' },
        { route: '/maps/properties', name: 'Houses' },
        { route: '/alone', name: 'Alone Page' },
    ];
}
