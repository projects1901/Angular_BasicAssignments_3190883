import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost, IUser } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  // private userDataSubject = new BehaviorSubject<any>(null);
  // userData$ = this.userDataSubject.asObservable();
  firstUser: IUser = {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin@123",
    userId: 1
  }
  allUsers: IUser[] = [this.firstUser];
  isUserLoggedIn: boolean = false;
  currentLoggedInUser?: IUser;
  allListing: IPost[] = [];
  postIndex = 2;
  userIndex = 1;
  markedFavouratesByUserId: Map<number, number[]> = new Map();


  featuredlistings: IPost[] = [
    {
      ownerName: 'Owner 1',
      apartmentType: 'Type 1',
      isSharedProperty: true,
      location: 'Location 1',
      squareFeet: '1000',
      leaseType: 'Lease 1',
      expectedAmount: 1000,
      isNegotiable: true,
      priceMode: 'Monthly',
      isFurnished: true,
      amenities: {
        swimming: true,
        carPark: true,
        waterHeater: true,
        clubHouse: true,
        elevator: true,
        powerBackup: true,
        gym: true
      },
      photosPath: 'https://5.imimg.com/data5/VX/MC/JQ/SELLER-77307144/appartment-construction-500x500.jpg',
      title: 'Jewel of India',
      description: 'Experience luxury living at its finest with this apartment offering captivating views of the downtown skyline.',
      createdDate: new Date('2024-08-01'),
      createdBy: 1,
      id: 1
    },
    {
      ownerName: 'Larry Page',
      apartmentType: 'Duplex',
      isSharedProperty: false,
      location: 'New Delhi, India',
      squareFeet: '1500',
      leaseType: '6 months',
      expectedAmount: 2000,
      isNegotiable: false,
      priceMode: 'Monthly',
      isFurnished: false,
      photosPath: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/87616830.jpg?k=d3190f350292713118958a4cbf9d82d44222d6cd6db03014bb248d904c623946&o=',
      amenities: {
        swimming: false,
        carPark: true,
        waterHeater: true,
        clubHouse: false,
        elevator: false,
        powerBackup: true,
        gym: false
      },
      title: '4 bhk Apartment',
      description: 'Enjoy the convenience of in-unit laundry alongside the building’s amenities, including a fitness center, rooftop terrace, and reserved parking.',
      createdDate: new Date('2024-08-02'),
      createdBy: 1,
      id: 2
    },
  ]


  constructor() {
    this.allListing.push(this.featuredlistings[0]);
    this.allListing.push(this.featuredlistings[1]);
  }

  register(user: IUser) {
    //this.userDataSubject.next(user);
    this.allUsers.push(user);
  }

  Login(isLoggedIn: boolean) {
    this.isUserLoggedIn = isLoggedIn;
  }

  Post(createPost: IPost) {
    this.allListing.push(createPost);
  }

  AddFavoriteIdsInLocalStorage(userId: number, apartmentId: number) {
    let key = "favourites";
    let appIds: number[] = []
    let objs = {
      userId: 0,
      apartmentIds: appIds
    }
    objs.userId = userId;
    objs.apartmentIds.push(apartmentId);
    let existingList = JSON.parse(sessionStorage.getItem(key) || '[]');

    // Check if an object with the same id already exists
    let index = existingList.findIndex((obj: { userId: number; }) => obj.userId === objs.userId);

    if (index !== -1) {
      // If an object with the same id exists, update its partIds
      existingList[index].apartmentIds = [
        ...new Set([...existingList[index].apartmentIds, ...objs.apartmentIds])
      ];
    } else {
      // If no object with the same id exists, add the new object to the list
      existingList.push(objs);
    }

    // Save the updated list back to local storage
    sessionStorage.setItem(key, JSON.stringify(existingList));
  }

  RemoveApartmentIdFromLocalStorage(userId: number, apartmentId: number) {
    let key = "favourites";
    let existingList = JSON.parse(sessionStorage.getItem(key) || '[]');
  
    // Find the index of the object with the given userId
    let index = existingList.findIndex((obj: { userId: number; }) => obj.userId === userId);
  
    if (index !== -1) {
      // If an object with the same userId exists
      let userObj = existingList[index];
  
      // Filter out the apartmentId to be removed
      userObj.apartmentIds = userObj.apartmentIds.filter((id: number) => id !== apartmentId);
  
      // If the apartmentIds array is empty after removal, remove the user object
      if (userObj.apartmentIds.length === 0) {
        existingList.splice(index, 1);
      } else {
        // Otherwise, update the existing object
        existingList[index] = userObj;
      }
  
      // Save the updated list back to local storage
      sessionStorage.setItem(key, JSON.stringify(existingList));
    } else {
      console.log(`User with ID ${userId} not found.`);
    }
  }
  


}
