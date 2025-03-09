import { Component, computed, inject, signal } from '@angular/core';

import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';



@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  
  
  
  readonly #pokemonService = inject(PokemonService);
  readonly pokemonList = signal(this.#pokemonService.getPokemonList());
  
  readonly searchTerm = signal('')

  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList();

    return pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  })
  
  size(pokemon : Pokemon) {
    if(pokemon.life < 15) {
      return 'petit'
    }

    if(pokemon.life > 25) {
      return'grand'
    }
    return 'moyen'

  }

 
  incrementeLife(pokemon : Pokemon) {
    pokemon.life = pokemon.life + 1;
  }
  decrementeLife(pokemon : Pokemon) {
    pokemon.life = pokemon.life - 1;
    
  }

}
