import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: any = '';
  game!: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }
  
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      
      // if(this.game.currentPlayer < this.game.players.length - 1){
      //   this.game.currentPlayer++;
      // }else{
      //   this.game.currentPlayer = 0;
      // }
     
      setTimeout(() => { 
        this.game.playedCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1500);
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
      }
    
    });
  }

}


