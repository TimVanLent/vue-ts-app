// Define the 'House' type with the required properties
export interface House {
  id: number;
  image: string;
  price: number;
  rooms: {
    bedrooms: number;
    bathrooms: number;
  };
  size: number;
  description: string;
  location: {
    street: string;
    houseNumber: string;
    houseNumberAddition: string;
    city: string;
    zip: string;
  };
  createdAt: string;
  constructionYear: string;
  hasGarage: boolean;
  madeByMe: boolean;
}

// Define a sample data type for creating/editing a house
export interface HouseFormData {
  streetName: string;
  houseNumber: string;
  numberAddition: string;
  zip: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  price: string;
  constructionYear: string;
  hasGarage: string;
  description: string;
}
