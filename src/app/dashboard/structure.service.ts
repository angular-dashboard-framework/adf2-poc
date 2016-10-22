import { Injectable } from '@angular/core';

import { Structure } from './structure';

@Injectable()
export class StructureService {

  private structures: Map<String, Structure> = new Map<String, Structure>();

  register(name: string, structure: Structure) {
    this.structures.set(name, structure);
  }

  get(name: string): Structure {
    return this.structures.get(name);
  }

  constructor() { }
}
