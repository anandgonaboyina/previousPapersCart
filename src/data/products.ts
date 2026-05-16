export interface Product {
    id: number;
    name: string;
    price: string;
    age: string;
    location: string;
    seller: string;
    sellerYear: string;
    sellerBio: string;
    sellerRating: number;
    sellerSales: number;
    images: string[];
    category: string;
    condition: string;
    description: string;
    postedDate: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Engineering Drawing Set",
        price: "₹450",
        age: "1 year old",
        location: "JNTUH",
        seller: "Rahul M.",
        sellerYear: "3rd Year, Mechanical Engineering",
        sellerBio: "Selling items I no longer need. All products are in great condition and genuinely maintained.",
        sellerRating: 4.5,
        sellerSales: 8,
        images: [
            "https://m.media-amazon.com/images/I/51drEYZBKML._SY300_SX300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/71h6PpGaz9L._SX522_.jpg",
            "https://m.media-amazon.com/images/I/61fDJsESDwL._SX522_.jpg"
        ],
        category: "Instruments",
        condition: "Good",
        description: "Complete engineering drawing set including T-square, set squares (30-60 and 45), protractor, French curves, and mini drafter attachments. Used for one semester only. All pieces are intact and in working condition. Ideal for first-year B.Tech students.",
        postedDate: "2 days ago"
    },
    {
        id: 2,
        name: "Data Structures Textbook (C++)",
        price: "₹300",
        age: "2 years old",
        location: "Osmania University",
        seller: "Priya S.",
        sellerYear: "4th Year, Computer Science",
        sellerBio: "Graduated and clearing out my study materials. Books are highlighted but in readable condition.",
        sellerRating: 4.8,
        sellerSales: 15,
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=300",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=300"
        ],
        category: "Books",
        condition: "Fair",
        description: "Data Structures and Algorithm Analysis in C++ by Mark Allen Weiss. Covers arrays, linked lists, trees, graphs, sorting, and hashing. Some pages are highlighted with notes in margins — great for quick revision.",
        postedDate: "1 week ago"
    },
    {
        id: 3,
        name: "Scientific Calculator (Casio FX-991EX)",
        price: "₹850",
        age: "6 months old",
        location: "JNTUH",
        seller: "Arjun K.",
        sellerYear: "2nd Year, Electronics Engineering",
        sellerBio: "Upgrading to a graphing calculator. This one works perfectly.",
        sellerRating: 4.2,
        sellerSales: 3,
        images: [
            "https://rukminim2.flixcart.com/image/480/640/xif0q/calculator/6/n/f/advanced-scientific-calculator-with-2-line-display-science-original-imahdae5drwg5bv3.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/480/640/xif0q/calculator/y/q/i/fx-991ex-casio-original-imaghp74rydvmhfz.jpeg?q=90"
        ],
        category: "Electronics",
        condition: "Like New",
        description: "Casio FX-991EX Classwiz with 552 functions. Features spreadsheet functionality, QR code output, and high-resolution display. Battery included. No scratches or damage. Comes with original cover.",
        postedDate: "3 days ago"
    },
    {
        id: 4,
        name: "First Year B.Tech Complete Books",
        price: "₹1200",
        age: "1.5 years old",
        location: "Kakatiya University",
        seller: "Neha V.",
        sellerYear: "3rd Year, Civil Engineering",
        sellerBio: "Selling my entire first-year collection. Prefer selling as a bundle.",
        sellerRating: 4.6,
        sellerSales: 5,
        images: [
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400&h=300",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=300"
        ],
        category: "Books",
        condition: "Good",
        description: "Bundle of 6 textbooks covering Mathematics-I, Mathematics-II, Physics, Chemistry, English, and Engineering Graphics. All JNTUH-syllabus aligned. Minor wear on covers but pages are clean.",
        postedDate: "5 days ago"
    },
    {
        id: 5,
        name: "Mini Drafter",
        price: "₹200",
        age: "2 years old",
        location: "Andhra University",
        seller: "Karthik R.",
        sellerYear: "4th Year, Mechanical Engineering",
        sellerBio: "Final year student clearing out supplies before graduation.",
        sellerRating: 4.0,
        sellerSales: 2,
        images: [
            "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRCEpIUAfd2Lb_xj85YICx3v_3P9LRBbZ7of1TWzQXQM1hDf95VvujyHV2bM9K1mNmUbD5GauPBqEw4duAz1Fe9i1V_mcSF_bFr12zmEo-lu5iADwYD7Y0cTQ",
            "https://m.media-amazon.com/images/I/51drEYZBKML._SY300_SX300_QL70_FMwebp_.jpg"
        ],
        category: "Instruments",
        condition: "Fair",
        description: "Standard mini drafter for engineering drawing. Clamp mechanism works well. Some cosmetic scratches but fully functional. A budget-friendly option for freshers.",
        postedDate: "1 week ago"
    },
    {
        id: 6,
        name: "Arduino Uno Kit",
        price: "₹1500",
        age: "3 months old",
        location: "Osmania University",
        seller: "Sandeep B.",
        sellerYear: "3rd Year, ECE",
        sellerBio: "Project completed, selling the full kit with extras.",
        sellerRating: 4.9,
        sellerSales: 12,
        images: [
            "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400&h=300",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=300"
        ],
        category: "Electronics",
        condition: "Like New",
        description: "Complete Arduino Uno R3 starter kit. Includes breadboard, jumper wires, LEDs, resistors, sensors (temperature, ultrasonic, IR), servo motor, and LCD display. Perfect for mini-projects and lab work.",
        postedDate: "1 day ago"
    }
];

export const COLLEGES = ["All Locations", "JNTUH", "Osmania University", "Kakatiya University", "Andhra University"];
