import { Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }

  getPokemonById(id: number): Pokemon  {
    const pokemon = POKEMON_LIST.find(pokemon => pokemon.id == id);

    if(!pokemon) {
      throw new Error(`no Pokemon found whith id ${id}`);
    }
    return pokemon;
  }
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Normal',
      'Poison',
      'Electrik',
      'Insecte',
      'Vol',
      'Fée',
      

    ];
  }
}
