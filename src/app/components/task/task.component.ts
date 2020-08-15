import { Component, OnInit, Input } from '@angular/core';
import { Profil } from 'src/app/models/profil.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() item: Profil;
  
  constructor() { }

  ngOnInit(): void {
  }

}
