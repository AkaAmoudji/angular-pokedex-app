import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe,RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card {cursor: pointer;}`
})
export class PokemonListComponent {

  
  readonly #pokemonService = inject(PokemonService);
  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {initialValue: []});
  
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

 
  // incrementeLife(pokemon : Pokemon) {
  //   pokemon.life = pokemon.life + 1;
  // }
  // decrementeLife(pokemon : Pokemon) {
  //   pokemon.life = pokemon.life - 1;
    
  // }

}
