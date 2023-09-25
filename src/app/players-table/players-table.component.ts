import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { player } from './player';
import { PlayerService } from './player.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
})
export class PlayersTableComponent implements OnInit,AfterViewInit {
  tableData = new MatTableDataSource<player>();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'name',
    'faction_name',
    'revivable',
    'status',
  ];

  constructor(private playerService: PlayerService) {}

  public getPlayers() {
    this.playerService.getPlayers().subscribe((response: player[]) => {
      this.tableData.data = response;
    });
  }

  ngOnInit(): void {
    this.getPlayers();
    this.playerService.data$.subscribe((newData)=>{
      this.tableData.data = newData;
    })
  }

  ngAfterViewInit(): void {
    this.tableData.sort = this.sort;
  }

}
