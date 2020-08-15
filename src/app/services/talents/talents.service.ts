import { Injectable } from '@angular/core';
import { Profil } from 'src/app/models/profil.model';

@Injectable({
  providedIn: 'root'
})
export class TalentsService {

  talents: Profil[];
  stages: string[];
  talentsByTag: {};

  constructor() { }

  setTalents(talents) {
    this.talents = talents
  }

  setTalentsByTag() {
    let talentsByTag ={};
    this.talents.forEach(talent => {
      talent.tags.forEach(tag => {
        if(tag in talentsByTag) {
          talentsByTag[tag].push(talent);
        } else {
          talentsByTag[tag]= [];
          talentsByTag[tag].push(talent);
        }
      })
    })
    this.talentsByTag = talentsByTag;
  }

  getAllTags() {
    let tags = [];
    this.talents.forEach(item => {
      tags.push(item.tags);
    })
    tags = [...new Set(tags.flat(1))];
    return tags;
  }

  getAllStage() {
    this.stages = [];
    this.talents.forEach(item => {
      this.stages.push(item.stage);
    })
    this.stages = [...new Set(this.stages)];
    return this.stages;
  }

  getTalentsByTags(tags: string[]) {

  }


}
