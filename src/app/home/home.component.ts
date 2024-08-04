import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgClass, NgFor } from '@angular/common';
import { CommonserviceService } from '../services/commonservice.service';
import { IPost } from '../model';
import { ApartmentListComponent } from '../apartment-list/apartment-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NgFor, NgClass, ApartmentListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredlistings: IPost[] = []
  currentSlideIndex = 0;
  favorites: Set<number> = new Set<number>();
  userId: number = 0;
  constructor(private commonService: CommonserviceService, private route:Router) {    
  }
  ngOnInit()
  {
    this.featuredlistings = this.getLatestThreePosts(this.commonService.allListing);
    if (typeof document !== 'undefined') {
    const carouselElement = document.getElementById('apartmentCarousel');
    carouselElement?.addEventListener('slid.bs.carousel', (event: any) => {
      this.currentSlideIndex = event.to;
    });
    this.userId = this.commonService.currentLoggedInUser?.userId ?? 0;
    this.loadFavorites();
  }
  }

  viewDetails(apartment: any) {
    this.route.navigate(['/details',apartment.id]);
  }

  markAsFavourite(apartment: any) {
    if (this.userId != 0)
    {
    const apartmentId = apartment.id;
    if (this.isFavorite(apartmentId)) {
      this.favorites.delete(apartmentId);
      this.commonService.RemoveApartmentIdFromLocalStorage(this.userId, apartment.id)
    } else {
      this.favorites.add(apartmentId);
      this.commonService.AddFavoriteIdsInLocalStorage(this.userId, apartment.id);
    }   
  }
  }

  loadFavorites() {
    const key = 'favourites';
    const favoritesList = JSON.parse(sessionStorage.getItem(key) || '[]') as { userId: number, apartmentIds: number[] }[];
    const userFavorites = favoritesList.find(fav => fav.userId === this.userId);

    if (userFavorites) {
      this.favorites = new Set(userFavorites.apartmentIds);
    }
  }
  isFavorite(apartmentId: number): boolean {
    return this.favorites.has(apartmentId);
  }

  getLatestThreePosts(posts: IPost[]): IPost[] {
    return posts
      .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
      .slice(0, 3);
  }
}
