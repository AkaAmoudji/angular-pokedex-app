import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';


const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfileComponent, title: 'Pokemon'  },
  { path: 'pokemons', component: PokemonListComponent , title: 'Pokedex'},
  { path: '', redirectTo: '/pokemons', pathMatch:'full'},
  { path: '**', component: PageNoFoundComponent },
];
export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)

  ]
};
