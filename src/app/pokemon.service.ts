import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly #POMEMON_API_URL = 'http://localhost:3000/pokemons';
  readonly #http = inject(HttpClient);

  
  getPokemonList(): Observable<PokemonList> {
    return this.#http.get<PokemonList>(this.#POMEMON_API_URL);
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
