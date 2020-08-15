import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model'
import { Column } from 'src/app/models/column.model';
import { ApiService } from 'src/app/services/api/api.service'
import { TalentsService } from 'src/app/services/talents/talents.service'
import { Profil } from 'src/app/models/profil.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(private apiService: ApiService,
              private talentsService: TalentsService) { }

  board: Board = new Board('Test board', [])
  talents : Profil[];
  tags: string[];
  ngOnInit(): void {
    this.apiService.getTalents().subscribe(
      talents => {
        this.talentsService.setTalents(talents);
        this.talentsService.setTalentsByTag();
        this.tags = this.talentsService.getAllTags();
        this.talentsService.getAllStage().forEach(stage => {
          
          this.board.columns.push(new Column(stage, [] ))
        });
      }
    );
  }
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  tagChange(event) {
    let talents = [];
    event.forEach(tag => {
      talents.push(this.talentsService.talentsByTag[tag])
    });
    talents = [...new Set(talents.flat(1))];
    talents.forEach(talent => {
    })
    this.board.columns.forEach(column => {
      const tals = talents.filter(o => o.stage === column.name);
      column.tasks = tals;
    })

    
  }


}
