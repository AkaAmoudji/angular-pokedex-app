import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import {
   FormArray,
   FormControl,
   FormGroup,
   ReactiveFormsModule,
   Validators
}from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';

 
 @Component({
   selector: 'app-pokemon-edit',
   standalone: true,
   imports: [RouterLink, ReactiveFormsModule],
   templateUrl: './pokemon-edit.component.html',
   styles: ``,
 })
 export class PokemonEditComponent {
   readonly route = inject(ActivatedRoute);
   readonly pokemonService = inject(PokemonService);
   readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
   readonly pokemon = signal(
     this.pokemonService.getPokemonById(this.pokemonId)
   ).asReadonly();
   readonly POKEMON_RULES =POKEMON_RULES;



   readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN)
    ]),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
   });

   // recuperer la liste de tous les pokemons selectionnés par l'utilisateur 
   get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;

   }

   get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;


   }

   get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;

   }

   incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
   }

   decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
   }

   // Méthode qui vérifie si un type de Pokémon est déjà sélectionné
   isPokemonTypeSelected(type: string): boolean {
    // Parcourt la liste des types (FormArray.controls)
   // et retourne true si un des contrôles a une valeur égale à 'type'
    return !!this.pokemonTypeList.controls.find((control) => control.value == type)
   }

   onPokemonTypeChange(type: string, isChecked: boolean) {
    if(isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);


    }
    else {
      const index = this.pokemonTypeList.controls.map(
        (control) => control.value
      ).indexOf(type);

      this.pokemonTypeList.removeAt(index);
      


    }




   }
   getPokemonColor(type: string){
    return getPokemonColor(type); 
   } 

   getChipTextColor(type: string):'black' | 'white' {
    return type == 'Electrik' ? 'black' : 'white'

   }

   onSubmit() {
    console.log(this.form.value);
   }

   
 }