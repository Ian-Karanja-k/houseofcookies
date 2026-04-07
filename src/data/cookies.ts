import cookieChocolate from "@/assets/cookie-chocolate.jpg";
import cookieVanilla from "@/assets/cookie-vanilla.jpg";
import cookieRedvelvet from "@/assets/cookie-redvelvet.jpg";
import cookieMacadamia from "@/assets/cookie-macadamia.jpg";
import cookieCoconut from "@/assets/cookie-coconut.jpg";
import cookieChocchip from "@/assets/cookie-chocchip.jpg";
import cookieMatcha from "@/assets/cookie-matcha.jpg";
import cookieCaramel from "@/assets/cookie-caramel.jpg";
import cookieGinger from "@/assets/cookie-ginger.jpg";
import cookieBanana from "@/assets/cookie-banana.jpg";
import cookieHoney from "@/assets/cookie-honey.jpg";

export type CookieCategory = "Chocolate" | "Vanilla" | "Coconut" | "Special Editions";

export interface Cookie {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CookieCategory;
}

export const cookies: Cookie[] = [
  {
    id: "1",
    name: "Double Chocolate Truffle",
    description: "Rich Belgian chocolate with a molten truffle center",
    price: 350,
    image: cookieChocolate,
    category: "Chocolate",
  },
  {
    id: "2",
    name: "Chocolate Chip Classic",
    description: "Golden butter cookie loaded with premium chocolate chips",
    price: 300,
    image: cookieChocchip,
    category: "Chocolate",
  },
  {
    id: "3",
    name: "Macadamia Chocolate",
    description: "Roasted macadamia nuts with white chocolate chips",
    price: 380,
    image: cookieMacadamia,
    category: "Chocolate",
  },
  {
    id: "4",
    name: "Vanilla Royale",
    description: "Madagascar vanilla bean with white chocolate glaze",
    price: 300,
    image: cookieVanilla,
    category: "Vanilla",
  },
  {
    id: "5",
    name: "Red Velvet Dream",
    description: "Classic red velvet with cream cheese frosting",
    price: 400,
    image: cookieRedvelvet,
    category: "Vanilla",
  },
  {
    id: "6",
    name: "Coconut Bliss",
    description: "Toasted coconut flakes with creamy white chocolate",
    price: 320,
    image: cookieCoconut,
    category: "Coconut",
  },
  {
    id: "7",
    name: "Coconut Caramel Swirl",
    description: "Coconut cookie with rich salted caramel ribbons",
    price: 360,
    image: cookieCaramel,
    category: "Coconut",
  },
  {
    id: "8",
    name: "Ginger Snap Luxe",
    description: "Warm ginger spice with crystallized ginger pieces",
    price: 350,
    image: cookieGinger,
    category: "Special Editions",
  },
  {
    id: "9",
    name: "Banana Foster",
    description: "Caramelized banana with brown sugar and cinnamon",
    price: 380,
    image: cookieBanana,
    category: "Special Editions",
  },
  {
    id: "10",
    name: "Honey Glazed Gold",
    description: "Raw honey glaze with oat crumble and sea salt",
    price: 400,
    image: cookieHoney,
    category: "Special Editions",
  },
  {
    id: "11",
    name: "Matcha Zen",
    description: "Ceremonial grade matcha with white chocolate",
    price: 450,
    image: cookieMatcha,
    category: "Special Editions",
  },
];
