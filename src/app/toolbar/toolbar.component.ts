import { Component } from '@angular/core';
import { PlayerService } from "../players-table/player.service";
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('rotating', style({ transform: 'rotate(-360deg)' })),
      transition('notRotating => rotating', animate('1s linear')),
    ]),
  ],
})

export class ToolbarComponent {
  isRotating: boolean = false;
  constructor(private playerService: PlayerService) {}
  updateTableData() {
    if (!this.isRotating) {
      this.isRotating = true;

      const newData = this.playerService.getPlayers().subscribe((data) => {
        this.playerService.updateData(data);

        setTimeout(() => {
          this.isRotating = false;
        }, 1000);
      });
    }
  }
}

