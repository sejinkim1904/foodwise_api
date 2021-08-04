export interface YelpBusiness {
    name: string;
    url: string;
    rating: number;
    distance: number;
    location: YelpBusinessLocation;
    phone: string;
}

export interface YelpBusinessLocation {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
}

export interface NoResults extends Partial<YelpBusiness> {
    error: string;
}
