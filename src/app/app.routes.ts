import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component'),
  },
  {
    path: 'catalogue',
    title: 'Catalogue',
    loadComponent: () => import('./components/catalogue/catalogue.component'),
  },
  {
    path: 'register',
    title: 'Registro',
    loadComponent: () => import('./components/signin/signin.component'),
  },

  {
    path: 'insideapp',
    title: 'insideApp',
    loadComponent: () => import('./components/inside-app/inside-app.component'),
  },
  {
    path: 'lists',
    title: 'Listas',
    loadComponent: () => import('./components/lists/lists.component'),
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'addalbum',
    title: 'Add album',
    loadComponent: () => import('./components/addalbum/addalbum.component'),
  },
  {
    path: 'checkbuy',
    title: 'Check Buy',
    loadComponent: () => import('./components/checkbuy/checkbuy.component'),
  },
  {
    path: 'editalbum',
    title: 'Edit album',
    loadComponent: () => import('./components/editalbum/editalbum.component'),
  },
  {
    path: 'albums/:id',
    title: 'Detail Album',
    loadComponent: () => import('./components/detail/detail.component'),
  },
  {
    path: 'filter',
    title: 'Search',
    loadComponent: () => import('./components/filter/filter.component'),
  },
  {
    path: 'genre/:genre',
    title: 'Genre',
    loadComponent: () => import('./components/searched/searched.component'),
  },
  { path: '**', redirectTo: '/home' },
];
