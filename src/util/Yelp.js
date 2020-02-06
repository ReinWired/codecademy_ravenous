const clientId = "U7HGaGAxOyk6fT1plOoBAQ";
const apiKey = "vcD44CtghJLr8QH7RFlCJJmvSVKLgAwjs49rRWBQVHqUgVDjrkTVXCTl2JOJDB4B_Zj4Spyp6P-iUgPwYs5W1bTFJqUKycsp-lv110tU72MZmJ_HQuwYctnBq5Y6XnYx";

export const Yelp = {
    search(term, location, sortBy) {
        const url = "https://api.yelp.com/v3/businesses/search?";
        const corsAnywhere = "https://cors-anywhere.herokuapp.com/";

        return fetch(`${corsAnywhere}${url}term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                const businessesArray = jsonResponse.businesses.map( business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zipCode,
                    category: business.categories.map( categObj => " " + categObj.title),
                    rating: business.rating,
                    reviewCount: business.reviewCount
                }));
                if (sortBy === 'rating') {
                    return businessesArray.sort( (a,b) => b.rating - a.rating);
                } else if (sortBy === 'review_count') {
                    return businessesArray.sort( (a,b) => b.reviewCount - a.reviewCount);
                } else {
                    return businessesArray;
                }
            }
        });
    }
};