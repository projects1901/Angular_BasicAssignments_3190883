import { Component } from '@angular/core';
import { CommonserviceService } from '../services/commonservice.service';
import { IPost } from '../model';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass, CommonModule, RouterModule],
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.scss'
})
export class ApartmentListComponent {

  featuredListings: IPost[] = [];
  filteredListings: IPost[] = [];

  location: string = '';
  priceRange: string = '';
  selectedAmenities: { [key: string]: boolean } = {};
  userId: number = 0;
  favorites: Set<number> = new Set<number>();

  amenitiesList: string[] = ['Swimming', 'Car Park', 'Water Heater', 'Club House', 'Elevator', 'Power Backup', 'Gym'];

  constructor(private commonService: CommonserviceService, private route:Router) {}

  ngOnInit() {
    this.featuredListings = this.commonService.allListing;
    this.filteredListings = this.featuredListings;
    this.amenitiesList.forEach(amenity => this.selectedAmenities[amenity] = false);
    this.userId = this.commonService.currentLoggedInUser?.userId ?? 0;
    this.loadFavorites();
  }

  filterListings() {
    this.filteredListings = this.featuredListings.filter(post => {
      const matchesLocation = !this.location || post.location.toLowerCase().includes(this.location.toLowerCase());
      const matchesPrice = !this.priceRange || this.priceRange === 'Any' || (this.priceRange === 'Below 1000' && post.expectedAmount < 1000) || (this.priceRange === '1000-2000' && post.expectedAmount >= 1000 && post.expectedAmount <= 2000) || (this.priceRange === 'Above 2000' && post.expectedAmount > 2000);
      const matchesAmenities = Object.keys(this.selectedAmenities).every(amenity => !this.selectedAmenities[amenity] || post.amenities[amenity.toLowerCase() as keyof typeof post.amenities]);
      return matchesLocation && matchesPrice && matchesAmenities;
    });
  }

  viewDetails(apartment: IPost) {
    this.route.navigate(['/details',apartment.id]);
  }

  markAsFavourite(apartment: IPost) {
    if(this.userId != 0)
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

}
