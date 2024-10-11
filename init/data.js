const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description:
            "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-118.6682, 34.0259] // Coordinates for Malibu, CA
        }
    },
    {
        title: "Modern Loft in Downtown",
        description:
            "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1200,
        location: "New York City",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-74.0060, 40.7128] // Coordinates for New York City, NY
        }
    },
    {
        title: "Mountain Retreat",
        description:
            "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 1000,
        location: "Aspen",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-106.8175, 39.1911] // Coordinates for Aspen, CO
        }
    },
    {
        title: "Historic Villa in Tuscany",
        description:
            "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 2500,
        location: "Florence",
        country: "Italy",
        geometry: {
            type: "Point",
            coordinates: [11.2558, 43.7696] // Coordinates for Florence, Italy
        }
    },
    {
        title: "Secluded Treehouse Getaway",
        description:
            "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 800,
        location: "Portland",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-122.6765, 45.5231] // Coordinates for Portland, OR
        }
    },
    {
        title: "Beachfront Paradise",
        description:
            "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 2000,
        location: "Cancun",
        country: "Mexico",
        geometry: {
            type: "Point",
            coordinates: [-86.8515, 21.1619] // Coordinates for Cancun, Mexico
        }
    },
    {
        title: "Charming Countryside B&B",
        description:
            "Enjoy a cozy stay at this charming countryside bed and breakfast. Perfect for a peaceful retreat.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkJTIwYW5kJTIwYnJlYWtmYXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 700,
        location: "Cornwall",
        country: "United Kingdom",
        geometry: {
            type: "Point",
            coordinates: [-4.4915, 50.4414] // Coordinates for Cornwall, UK
        }
    },
    {
        title: "Urban Studio Apartment",
        description:
            "Stay in this sleek and modern studio apartment in the heart of the city. Ideal for solo travelers or couples.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 900,
        location: "Tokyo",
        country: "Japan",
        geometry: {
            type: "Point",
            coordinates: [139.6917, 35.6895] // Coordinates for Tokyo, Japan
        }
    },
    {
        title: "Rustic Cabin by the Lake",
        description:
            "Escape to this rustic cabin by the lake for a peaceful retreat. Perfect for fishing, hiking, and enjoying nature.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGNhYmlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
        price: 1100,
        location: "Lake Tahoe",
        country: "United States",
        geometry: {
            type: "Point",
            coordinates: [-120.0354, 39.0968] // Coordinates for Lake Tahoe, CA
        }
    }
];

module.exports = { data: sampleListings };
