import { DatePipe } from '@angular/common';
 import { Component, inject, signal } from '@angular/core';
 import { ActivatedRoute, RouterLink } from '@angular/router';
 import { PokemonService } from '../../pokemon.service';
 
 @Component({
   selector: 'app-pokemon-edit',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './pokemon-edit.component.html',
   styles: ``,
 })
 export class PokemonEditComponent {
   readonly route = inject(ActivatedRoute);
   readonly pokemonService = inject(PokemonService);
   readonly pokemonId = signal(
     Number(this.route.snapshot.paramMap.get('id'))
   ).asReadonly();
   readonly pokemon = signal(
     this.pokemonService.getPokemonById(this.pokemonId())
   ).asReadonly();
 }