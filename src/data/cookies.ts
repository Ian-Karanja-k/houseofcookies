import cookieChocolate from "@/assets/cookie-chocolate.jpg";
import cookieVanilla from "@/assets/cookie-vanilla.jpg";
import cookieRedvelvet from "@/assets/cookie-redvelvet.jpg";
import cookieMacadamia from "@/assets/cookie-macadamia.jpg";
import cookieOatmeal from "@/assets/cookie-oatmeal.jpg";
import cookiePeanutbutter from "@/assets/cookie-peanutbutter.jpg";
import cookieMatcha from "@/assets/cookie-matcha.jpg";
import cookieCaramel from "@/assets/cookie-caramel.jpg";

export type CookieCategory = "Chocolate" | "Vanilla" | "Special Editions";

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
    name: "Vanilla Royale",
    description: "Madagascar vanilla bean with white chocolate glaze",
    price: 300,
    image: cookieVanilla,
    category: "Vanilla",
  },
  {
    id: "3",
    name: "Red Velvet Dream",
    description: "Classic red velvet with cream cheese frosting",
    price: 400,
    image: cookieRedvelvet,
    category: "Special Editions",
  },
  {
    id: "4",
    name: "Macadamia Gold",
    description: "Roasted macadamia nuts with white chocolate chips",
    price: 380,
    image: cookieMacadamia,
    category: "Chocolate",
  },
  {
    id: "5",
    name: "Oatmeal Raisin Classic",
    description: "Hearty oats with plump raisins and cinnamon",
    price: 280,
    image: cookieOatmeal,
    category: "Vanilla",
  },
  {
    id: "6",
    name: "Peanut Butter Bliss",
    description: "Creamy peanut butter with a honey drizzle",
    price: 320,
    image: cookiePeanutbutter,
    category: "Vanilla",
  },
  {
    id: "7",
    name: "Matcha Zen",
    description: "Ceremonial grade matcha with white chocolate",
    price: 450,
    image: cookieMatcha,
    category: "Special Editions",
  },
  {
    id: "8",
    name: "Salted Caramel Luxe",
    description: "Sea salt caramel with brown butter base",
    price: 420,
    image: cookieCaramel,
    category: "Special Editions",
  },
];
