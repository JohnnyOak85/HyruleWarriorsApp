import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MapService } from './services/map.service';
import { TileComponent } from './tile/tile.component';
import { Tile } from './tile/models/tile.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapComponent implements OnInit {
  public mapId: string;
  public tiles: Tile[];
  public viewType = '';
  private broadcaster = new BroadcastChannel('broadcaster');

  constructor(
    private activatedRoute: ActivatedRoute,
    private mapService: MapService,
    public dialog: MatDialog,
    protected http: HttpClient
  ) {}

  ngOnInit() {
    this.mapId = this.activatedRoute.snapshot.params.id;

    this.mapService.getTiles(this.mapId.toLowerCase()).subscribe((data) => {
      this.tiles = data.TILE_LIST;
    });

    this.viewType = localStorage.getItem('viewType');

    this.broadcaster.onmessage = (message) => {
      this.viewType = message.data;
    };
  }

  openTile(tile: Tile) {
    if (tile.blank) return;

    const config = new MatDialogConfig();

    config.data = { tile, map: this.mapId.toLowerCase() };

    this.dialog.open(TileComponent, config);
  }
}
