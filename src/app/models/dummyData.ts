import {Session} from "./classes/Session";
import {Order} from "./classes/order";
import {Employee} from "./classes/employee";
import {Gender} from "./enums/gender";
import {Category} from "./classes/category";
import {Pricelist} from "./classes/pricelist";
import {ContractType} from "./enums/contractType";
import {SessionStatus} from "./enums/sessionStatus";
import {Product} from "./classes/product";
import {ProgramType} from "./enums/programType";
import {Coupon} from "./classes/coupon";
import {CouponStatus} from "./enums/couponStatus";
import {BuyXGetY} from "./classes/buyXGetY";
import {Program} from "./classes/program";
import {BuyXGetYStatus} from "./enums/buyXGetYStatus";
import {Customer} from "./classes/customer";
import {linkAndAggregate, linkLists} from "./functions";
import {PricelistLine} from "./classes/pricelistLine";
import {OrderLine} from "./classes/orderLine";


export const _dummySessions: Session[] = [
  { id: 1, opened_by: 1, opened_at: new Date('2021-01-01'), closed_at: new Date('2021-02-01'), status: SessionStatus.Open },
  { id: 2, opened_by: 2, opened_at: new Date('2021-03-02'), closed_at: new Date('2021-04-02'), status: SessionStatus.Closed },
  { id: 3, opened_by: 3, opened_at: new Date('2021-05-03'), closed_at: new Date('2021-06-03'), status: SessionStatus.Closed },
  { id: 4, opened_by: 4, opened_at: new Date('2021-07-04'), closed_at: new Date('2021-08-04'), status: SessionStatus.Closed },
  { id: 5, opened_by: 5, opened_at: new Date('2021-09-05'), closed_at: new Date('2021-10-05'), status: SessionStatus.Closed },
  { id: 6, opened_by: 6, opened_at: new Date('2021-11-06'), closed_at: new Date('2021-12-06'), status: SessionStatus.Closed },
  { id: 7, opened_by: 5, opened_at: new Date('2021-01-13'), closed_at: new Date('2021-01-14'), status: SessionStatus.Closed },
  { id: 8, opened_by: 1, opened_at: new Date('2021-01-15'), closed_at: new Date('2021-01-16'), status: SessionStatus.Closed },
  { id: 9, opened_by: 1, opened_at: new Date('2021-01-17'), closed_at: new Date('2021-01-18'), status: SessionStatus.Closed },
  { id: 10, opened_by: 1, opened_at: new Date('2021-01-19'), closed_at: new Date('2021-01-20'), status: SessionStatus.Closed },
  { id: 11, opened_by: 1, opened_at: new Date('2021-01-21'), closed_at: new Date('2021-01-22'), status: SessionStatus.Closed },
  { id: 12, opened_by: 1, opened_at: new Date('2021-01-23'), closed_at: new Date('2021-01-24'), status: SessionStatus.Closed },
  { id: 13, opened_by: 1, opened_at: new Date('2022-01-25'), closed_at: new Date('2022-01-26'), status: SessionStatus.Closed },
  { id: 14, opened_by: 1, opened_at: new Date('2022-02-27'), closed_at: new Date('2022-02-28'), status: SessionStatus.Closed },
  { id: 15, opened_by: 1, opened_at: new Date('2022-03-01'), closed_at: new Date('2022-03-02'), status: SessionStatus.Closed }
];


export const _dummyOrders: Order[] = [
  { order_ref: 1, session_id: 1, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-01-01'), receipt_number: 'REC001', total: 100 },
  { order_ref: 2, session_id: 2, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-02-02'), receipt_number: 'REC002', total: 150 },
  { order_ref: 3, session_id: 1, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-03-03'), receipt_number: 'REC003', total: 75 },
  { order_ref: 4, session_id: 3, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-04-04'), receipt_number: 'REC004', total: 200 },
  { order_ref: 5, session_id: 2, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-05-05'), receipt_number: 'REC005', total: 120 },
  { order_ref: 6, session_id: 3, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-06-06'), receipt_number: 'REC006', total: 180 },
  { order_ref: 7, session_id: 1, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-07-07'), receipt_number: 'REC007', total: 50 },
  { order_ref: 8, session_id: 4, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-08-08'), receipt_number: 'REC008', total: 300 },
  { order_ref: 9, session_id: 2, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-09-09'), receipt_number: 'REC009', total: 110 },
  { order_ref: 10, session_id: 5, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-10-10'), receipt_number: 'REC010', total: 99 },
  { order_ref: 11, session_id: 4, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-11-11'), receipt_number: 'REC011', total: 210 },
  { order_ref: 12, session_id: 5, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2021-12-12'), receipt_number: 'REC012', total: 250 },
  { order_ref: 13, session_id: 3, pricelist_id: 0, employee_id: 1, customer_id: 1, date: new Date('2022-01-13'), receipt_number: 'REC013', total: 125 }
];


export const dummyOrdersLines: OrderLine[] = []
export const dummyEmployees: Employee[] = [
  { id: 1, number: '12345678', name: 'Youssef Maaouia', gender: Gender.Male, job_position: 'Waiter', phone: '97951706', contract_type: ContractType.Cdd, cnss_registration_number: '12345678', email: 'youssef.maaouia@codingbetounsi.com',is_active : true },
  { id: 2, number: '12345679', name: 'Raouf Ghrissi', gender: Gender.Male, job_position: 'Server', phone: '56027707', contract_type: ContractType.Cdd, cnss_registration_number: '12345678', email: 'raouf.ghrissi@codingbetounsi.com',is_active : true },
  { id: 3, number: '12345670', name: 'Mahdi Cheikhrouhou', gender: Gender.Male, job_position: 'Cook', phone: '28345679', contract_type: ContractType.Cdi, cnss_registration_number: '98765432', email: 'mahdi.cheikhrouhou@codingbetounsi.com',is_active : true },
  { id: 4, number: '12345681', name: 'Kerim Omran', gender: Gender.Female, job_position: 'Server', phone: '99649691', contract_type: ContractType.Cdd, cnss_registration_number: '12345678', email: 'kerim.omran@codingbetounsi.com',is_active : true },
  { id: 5, number: '12345682', name: 'Rayen Chtioui', gender: Gender.Female, job_position: 'Manager', phone: '52847339', contract_type: ContractType.Cdd, cnss_registration_number: '12345678', email: 'rayen.chtioui@codingbetounsi.com',is_active : false },
  { id: 6, number: '12345680', name: 'Fedi Hmaidi', gender: Gender.Male, job_position: 'Chef', phone: '59427708', contract_type: ContractType.Cdd, cnss_registration_number: '12345678', email: 'fedi.hmaidi@codingbetounsi.com',is_active : true },
  { id: 7, number: '12345671', name: 'Hedi Elasmi', gender: Gender.Male, job_position: 'Cashier', phone: '98765433', contract_type: ContractType.Cdi, cnss_registration_number: '98765432', email: 'hedi.elasmi@codingbetounsi.com',is_active : true },
  { id: 8, number: '12345672', name: 'Ali ', gender: Gender.Male, job_position: 'Manager', phone: '98765434', contract_type: ContractType.Cdi, cnss_registration_number: '98765432', email: 'ali@codingbetounsi.com',is_active : true },
  { id: 9, number: '12345673', name: 'Fatima Bentayeb', gender: Gender.Female, job_position: 'Server', phone: '98765435', contract_type: ContractType.Cdi, cnss_registration_number: '98765432', email: 'fatima.bentayeb@codingbetounsi.com',is_active : true },
  { id: 10, number: '12345674', name: 'Khaled Ben Ali', gender: Gender.Male, job_position: 'Busser', phone: '98765436', contract_type: ContractType.Cdi, cnss_registration_number: '98765432', email: 'khaled.benali@codingbetounsi.com',is_active : true }
];


export const dummyCategories: Category[] = [
  { id: 1, name: 'Appetizers', description: 'Start your meal with our enticing appetizers.', icon: 'restaurant_menu' },
  { id: 2, name: 'Main Courses', description: 'Hearty and satisfying main dishes for any appetite.', icon: 'dinner_dining' },
  { id: 3, name: 'Drinks', description: 'A variety of beverages to quench your thirst.', icon: 'local_bar' },
  { id: 4, name: 'Desserts', description: 'Sweet treats to conclude your dining experience.', icon: 'icecream' },
  { id: 6, name: 'Salads', description: 'Crisp and refreshing salads made with the finest ingredients.', icon: 'spa' }
];

const _dummyProducts: Product[] = [
  { id: 1, name: "Margherita Pizza", description: "Classic pizza with tomato sauce and mozzarella cheese", category_id: 2, price: 12.99, quantity: 10, image_path: "assets/products/margherita_pizza.png" },
  { id: 2, name: "Caesar Salad", description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese", category_id: 6, price: 8.50, quantity: 15, image_path: "assets/products/caesar_salad.png" },
  { id: 3, name: "Spaghetti Carbonara", description: "Traditional Italian pasta with creamy sauce, pancetta, and egg", category_id: 2, price: 14.00, quantity: 8, image_path: "assets/products/spaghetti_carbonara.png" },
  { id: 4, name: "Grilled Salmon", description: "Grilled salmon fillet with a side of vegetables", category_id: 2, price: 18.75, quantity: 5, image_path: "assets/products/grilled_salmon.png" },
  { id: 5, name: "Chocolate Cake", description: "Rich and moist chocolate cake with chocolate frosting", category_id: 4, price: 6.50, quantity: 20, image_path: "assets/products/chocolate_cake.png" },
  { id: 6, name: "Mojito", description: "Refreshing cocktail with rum, mint, lime, sugar, and soda water", category_id: 3, price: 7.00, quantity: 30, image_path: "assets/products/mojito.png" },
  { id: 7, name: "Beef Burger", description: "Juicy beef patty with lettuce, tomato, and cheese on a brioche bun", category_id: 2, price: 10.00, quantity: 12, image_path: "assets/products/beef_burger.png" },
  { id: 8, name: "Tiramisu", description: "Italian coffee-flavored dessert with mascarpone cheese", category_id: 4, price: 7.00, quantity: 10, image_path: "assets/products/tiramisu.png" },
  { id: 9, name: "Tomato Soup", description: "Creamy tomato soup served with croutons and fresh basil", category_id: 1, price: 5.99, quantity: 15, image_path: "assets/products/tomato_soup.png" },
  { id: 10, name: "Mushroom Risotto", description: "Creamy risotto with wild mushrooms and parmesan cheese", category_id: 2, price: 13.50, quantity: 7, image_path: "assets/products/mushroom_risotto.png" },
  { id: 11, name: "Apple Pie", description: "Traditional apple pie with a flaky crust, served with vanilla ice cream", category_id: 4, price: 6.75, quantity: 10, image_path: "assets/products/apple_pie.png" },
  { id: 12, name: "Lemonade", description: "Freshly squeezed lemonade with a touch of sweetness", category_id: 1, price: 3.50, quantity: 25, image_path: "assets/products/lemonade.png" },
  { id: 13, name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, basil, and balsamic glaze", category_id: 1, price: 9.00, quantity: 10, image_path: "assets/products/caprese_salad.png" },
  { id: 14, name: "Grilled Cheese Sandwich", description: "Melted cheese between slices of toasted bread", category_id: 1, price: 4.99, quantity: 20, image_path: "assets/products/grilled_cheese_sandwich.png" },
  { id: 15, name: "Espresso", description: "Strong and richly flavored concentrated coffee", category_id: 1, price: 2.50, quantity: 40, image_path: "assets/products/espresso.png" }
];
export const _dummyPricelists: Pricelist[] = [
  { id: 1, name: "Beverage Selection", description: "A diverse array of popular coffee and tea beverages ideal for cafes and coffee shops." },
  { id: 2, name: "Fine Dining Courses", description: "Elegant and upscale dining options perfect for gourmet restaurants and special occasions." },
  { id: 3, name: "Fast Food Favorites", description: "Quick and satisfying fast food classics catered to casual dining and quick service eateries." }
];

const _dummyPricelistLines: PricelistLine[] = [
  { id: 1, pricelist_id: 1, product_id: 1, price: 3.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') },
  { id: 2, pricelist_id: 1, product_id: 2, price: 4.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') },
  { id: 3, pricelist_id: 1, product_id: 3, price: 5.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') },
  { id: 4, pricelist_id: 2, product_id: 4, price: 6.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') },
  { id: 5, pricelist_id: 2, product_id: 5, price: 2.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') },
  { id: 6, pricelist_id: 3, product_id: 6, price: 3.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') },
  { id: 7, pricelist_id: 3, product_id: 7, price: 4.99, min_quantity: 1, start_date: new Date('2021-01-01'), end_date: new Date('2021-12-31') }
];

export const dummyCustomers: Customer[] = [
  {id: 1, name: "Amal Ben Ali", email: "amal.benali@example.tn", phone: "+216 55 555 555",pricelist_id : 1},
  {id: 2, name: "Mohamed Bouazizi", email: "mohamed.bouazizi@example.tn", phone: "+216 71 111 111",pricelist_id : 2},
  {id: 3, name: "Leila Trabelsi", email: "leila.trabelsi@example.tn", phone: "+216 22 222 222",pricelist_id : 3},
  {id: 4, name: "Sami Khelifa", email: "sami.khelifa@example.tn", phone: "+216 99 999 999",pricelist_id : 1},
  {id: 5, name: "Yasmine Bechir", email: "yasmine.bechir@example.tn", phone: "+216 44 444 444",pricelist_id : 2},
  {id: 6, name: "Karim Mejri", email: "karim.mejri@example.tn", phone: "+216 33 333 333",pricelist_id : 3},
  {id: 7, name: "Sonia Jabri", email: "sonia.jabri@example.tn", phone: "+216 66 666 666",pricelist_id : 0},
  {id: 8, name: "Ahmed Laabidi", email: "ahmed.laabidi@example.tn", phone: "+216 88 888 888",pricelist_id : 0},
  {id: 9, name: "Hanan Gharbi", email: "hanan.gharbi@example.tn", phone: "+216 11 111 111",pricelist_id : 0},
  {id: 10, name: "Ali Mestiri", email: "ali.mestiri@example.tn", phone: "+216 77 777 777",pricelist_id : 0},
  {id: 11, name: "Nour Hamdi", email: "nour.hamdi@example.tn", phone: "+216 22 222 222",pricelist_id : 0},
  {id: 12, name: "Marwan Boughedir", email: "marwan.boughedir@example.tn", phone: "+216 99 999 999",pricelist_id : 0},
  {id: 13, name: "Lina Ben Achour", email: "lina.benachour@example.tn", phone: "+216 44 444 444",pricelist_id : 0},
  {id: 14, name: "Zied Dridi", email: "zied.dridi@example.tn", phone: "+216 33 333 333",pricelist_id : 0},
  {id: 15, name: "Imen Chakroun", email: "imen.chakroun@example.tn", phone: "+216 66 666 666",pricelist_id : 0},
];

// Dummy Program with Coupons
const _dummyPrograms: Program[] = [
  { id: 1, name: 'Discount Bonanza', description: 'A program offering various discount coupons', start_date: new Date('2023-01-01'), end_date: new Date('2023-12-31'), type: ProgramType.Coupon },
  { id: 2, name: 'Buy More, Get More', description: 'A program offering rewards on multiple purchases', start_date: new Date('2023-01-01'), end_date: new Date('2023-12-31'), type: ProgramType.BuyXGetY }
];

export const dummyCoupons: Coupon[] = [
  { code: 'b0be-bxf8-287b', discount: 11, status: CouponStatus.Active, program_id: 1 },
  { code: 'd116-8hcb-60a3', discount: 30, status: CouponStatus.Active, program_id: 1 },
  { code: '9d50-7a69-4ed1', discount: 40, status: CouponStatus.Active, program_id: 1 },
  { code: '17cf-de71-baca', discount: 38, status: CouponStatus.Active, program_id: 1 },
  { code: 'b982-ad8f-0211', discount: 34, status: CouponStatus.Active, program_id: 1 },
];

const _dummyBuyXGetY: BuyXGetY[] = [
  { code: '17cf-de7b-baca', buy: 1, get: 2, status: BuyXGetYStatus.Active, program_id : 2 },
  { code: '5f3a-8d9e-4ab7', buy: 3, get: 2, status: BuyXGetYStatus.Active, program_id : 2 },
  { code: 'e2ab-6c2d-8f0e', buy: 1, get: 2, status: BuyXGetYStatus.Active, program_id : 2 },
  { code: '9f8d-3e1a-7c6f', buy: 1, get: 2, status: BuyXGetYStatus.Active, program_id : 2 },
  { code: 'd7ba-2c6f-1e9a', buy: 1, get: 2, status: BuyXGetYStatus.Active, program_id : 2 },
];
export const dummyCategoryIcons = [
  'restaurant_menu', // For Appetizers
  'dinner_dining', // For Main Courses
  'local_bar', // For Drinks
  'icecream', // For Desserts
  'sailing', // For Seafood
  'spa', // For Salads
  'lunch_dining', // For Pastas
  'soup_kitchen', // For Soups
  'emoji_food_beverage', // For Beverages
  'local_drink', // For Cocktails
  'coffee', // For Hot Drinks
  'bakery_dining', // For Bakery
  'child_friendly', // For Kids
  'eco', // For Vegetarian
  'grass', // For Vegan
]
//joints
export const dummySessions: Session[] = linkLists(_dummySessions, dummyEmployees, 'opened_by', 'id', 'employee_name', 'name');
export const dummyProducts: Product[] = linkLists(_dummyProducts, dummyCategories, 'category_id', 'id', 'category', 'name');
const dummyPricelistLines_product: PricelistLine[] = linkLists(_dummyPricelistLines, dummyProducts, 'product_id', 'id', 'product_name', 'name');
const dummyPricelistLines: PricelistLine[] = linkLists(dummyPricelistLines_product, _dummyPricelists, 'pricelist_id', 'id', 'pricelist_name', 'name');
const dummyOrders_employee: Order[] =  linkLists(_dummyOrders, dummyEmployees, 'employee_id', 'id', 'employee_name', 'name');
export const dummyOrders: Order[] = linkLists(dummyOrders_employee, dummyCustomers, 'customer_id', 'id', 'customer_name', 'name');



export const dummyPricelists: Pricelist[] = linkAndAggregate( _dummyPricelists,dummyPricelistLines, 'id','pricelist_id','lines');

export const dummyBuyXGetY_buy: BuyXGetY[] = linkLists(_dummyBuyXGetY, dummyProducts, 'buy', 'id', 'buy_name', 'name');
export const dummyBuyXGetY: BuyXGetY[] = linkLists(dummyBuyXGetY_buy, dummyProducts, 'get', 'id', 'get_name', 'name');
export const dummyProgramLines:(Coupon | BuyXGetY)[]= [...dummyCoupons, ...dummyBuyXGetY];

export const dummyPrograms: Program[] = linkAndAggregate(_dummyPrograms, dummyProgramLines, 'id', 'program_id', 'lines');

