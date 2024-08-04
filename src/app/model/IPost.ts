export interface IPost {
  ownerName: string,
  apartmentType: string,
  isSharedProperty: boolean,
  location: string,
  squareFeet: string,
  leaseType: string,
  expectedAmount: number,
  isNegotiable: boolean,
  priceMode: string,
  isFurnished: boolean,
  amenities: {
    swimming: boolean,
    carPark: boolean,
    waterHeater: boolean,
    clubHouse: boolean,
    elevator: boolean,
    powerBackup: boolean,
    gym: boolean
  },
  title: string,
  description: string,
  photosPath?: string,
  createdDate: Date
  createdBy: number,
  id: number
}