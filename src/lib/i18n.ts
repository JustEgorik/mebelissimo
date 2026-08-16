export type Lang = "ru" | "ro";

export type Copy = { ru: string; ro: string };

/** Достаёт нужный язык из пары. */
export function pick(copy: Copy, lang: Lang) {
  return copy[lang];
}

const c = (ru: string, ro: string): Copy => ({ ru, ro });

export const T = {
  // Шапка и подвал
  navShop: c("Магазин", "Magazin"),
  navDesigners: c("Дизайнерам", "Designerilor"),
  navContacts: c("Контакты", "Contacte"),
  cart: c("Корзина", "Coș"),
  catalog: c("Каталог", "Catalog"),
  inTouch: c("Мы на связи", "Suntem în contact"),
  account: c("Личный кабинет", "Cont personal"),
  about: c(
    "Мы специализируемся на изготовлении мебели по индивидуальным проектам: кухни, шкафы-купе, прихожие, детские комнаты, гостиные, спальни, кабинеты и т.д.",
    "Ne specializăm în producerea mobilei la comandă: bucătării, dulapuri glisante, holuri, camere pentru copii, sufragerii, dormitoare, birouri etc.",
  ),

  // Главная
  heroKicker: c(
    "Мебель по индивидуальным проектам · Chișinău",
    "Mobilă la comandă · Chișinău",
  ),
  heroLine1: c("Ваши идеи —", "Ideile dumneavoastră —"),
  heroLine2: c("Наша реализация", "Realizarea noastră"),
  heroCta: c("Перейти в магазин", "Spre magazin"),
  heroPartners: c("Дизайнеры как партнёры", "Designerii ca parteneri"),
  statBeds: c("Кровати", "Paturi"),
  statKids: c("Детские", "Pentru copii"),
  statSofas: c("Диваны", "Canapele"),
  fabricPick: c("Выбор обивки", "Alegerea tapiseriei"),
  fabricAny: c("Любой цвет и вкус", "Orice culoare și gust"),
  wardrobes: c("Шкафы-купе", "Dulapuri glisante"),
  kitchens: c("Кухни", "Bucătării"),
  scrollCue: c("Прокрутите", "Derulați"),
  seeAll: c("Смотреть все", "Vedeți tot"),
  reviewsKicker: c("Что говорят клиенты", "Ce spun clienții"),
  reviewsTitle: c("Оценки", "Aprecieri"),
  since: c("Мебель на заказ с 2014 года", "Mobilă la comandă din 2014"),

  // Магазин
  home: c("Главная", "Prima pagină"),
  addToCart: c("В корзину", "Adaugă în coș"),
  added: c("Добавлено в корзину", "Adăugat în coș"),
  sortPopular: c("по популярности", "după popularitate"),
  sortCheap: c("сначала дешевле", "mai ieftine întâi"),
  sortExpensive: c("сначала дороже", "mai scumpe întâi"),
  allShown: c("Показаны все модели", "Toate modelele sunt afișate"),
  showMore: c("Показать ещё", "Arătați încă"),

  // Товар
  manufacturer: c("Производитель", "Producător"),
  model: c("Модель", "Model"),
  availability: c("Наличие", "Disponibilitate"),
  preorder: c("Предзаказ", "Precomandă"),
  production: c("Изготовление", "Producere"),
  productionTerm: c("20–30 дней", "20–30 de zile"),
  size: c("Размер", "Dimensiune"),
  fabric: c("Обивка", "Tapiserie"),
  madeToMeasure: c(
    "Модель изготавливается по вашим размерам. Обивка, цвет и основание — на выбор; образцы тканей привозим домой.",
    "Modelul se produce la dimensiunile dumneavoastră. Tapiseria, culoarea și baza — la alegere; mostrele de textile le aducem acasă.",
  ),
  tabDescription: c("Описание", "Descriere"),
  tabReviews: c("Отзывы (0)", "Recenzii (0)"),
  noReviews: c(
    "Отзывов об этой модели пока нет.",
    "Încă nu sunt recenzii pentru acest model.",
  ),
  writeReview: c("Написать отзыв", "Scrieți o recenzie"),
  desc1: c(
    "Мягкое стёганое изголовье со спокойной геометрией. Каркас из массива, основание на буковых ламелях.",
    "Tăblie moale, capitonată, cu linii curate. Carcasa este din lemn masiv, baza cu lamele din fag.",
  ),
  desc2: c(
    "Опционально: подъёмный механизм с бельевым ящиком, ножки из дерева или металла, обивка велюром, льном или шениллом.",
    "Opțional: mecanism de ridicare cu ladă pentru lenjerie, picioare din lemn sau metal, tapiserie din catifea, in sau șenil.",
  ),
  desc3: c(
    "Доставка по Кишинёву — бесплатно при заказе от 20 000 mdl. Сборка и установка на месте включены.",
    "Livrarea în Chișinău — gratuit la comenzi de la 20 000 mdl. Asamblarea și instalarea la domiciliu sunt incluse.",
  ),
  payment: c("Оплата", "Plata"),
  paymentText: c(
    "Оплата производится после подтверждения заказа.",
    "Plata se face după confirmarea comenzii.",
  ),
  credit: c("Кредит", "Credit"),
  creditText: c(
    "В рассрочку через партнёров: MAIB, Easy Credit.",
    "În rate prin partenerii noștri: MAIB, Easy Credit.",
  ),
  delivery: c("Доставка", "Livrare"),
  deliveryText: c(
    "Доставка осуществляется по Молдове.",
    "Livrăm în toată Moldova.",
  ),
  installation: c("Установка", "Instalare"),
  installationText: c(
    "Сборка и установка мебели на месте.",
    "Asamblarea și instalarea mobilei la domiciliu.",
  ),
  similar: c("Похожие модели", "Modele similare"),
  wholeCatalog: c("Весь каталог →", "Tot catalogul →"),

  // Корзина
  yourCart: c("Ваша корзина", "Coșul dumneavoastră"),
  emptyCart: c("Корзина пуста.", "Coșul este gol."),
  remove: c("Удалить", "Ștergeți"),
  keepShopping: c("← Продолжить покупки", "← Continuați cumpărăturile"),
  promo: c("Промокод", "Promocod"),
  apply: c("Применить", "Aplicați"),
  promoOk: c("Промокод применён: −10%", "Promocod aplicat: −10%"),
  promoBad: c("Промокод не найден", "Promocod invalid"),
  order: c("Заказ", "Comanda"),
  goods: c("Товары", "Produse"),
  deliveryChisinau: c("Доставка, Chișinău", "Livrare, Chișinău"),
  free: c("Бесплатно", "Gratuit"),
  discount: c("Скидка", "Reducere"),
  total: c("Итого", "Total"),
  checkout: c("Оформить заказ", "Finalizați comanda"),
  checkoutNote: c(
    "Свяжемся в течение рабочего дня, чтобы подтвердить размеры и обивку. Изготовление 20–30 дней.",
    "Vă contactăm în ziua lucrătoare pentru a confirma dimensiunile și tapiseria. Producere 20–30 de zile.",
  ),
  perPiece: c(" / шт", " / buc"),
} satisfies Record<string, Copy>;

/** Русское склонение: 1 модель, 2–4 модели, 5–20 моделей. */
function ru(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return `${n} ${few}`;
  return `${n} ${many}`;
}

/**
 * Румынский: «de» появляется, когда число оканчивается на 00 или на 20–99.
 * 8 modele, но 43 de modele.
 */
function ro(n: number, one: string, plural: string) {
  if (n === 1) return `${n} ${one}`;
  const mod100 = n % 100;
  const de = mod100 === 0 || mod100 >= 20 ? "de " : "";
  return `${n} ${de}${plural}`;
}

export function positions(n: number, lang: Lang) {
  return lang === "ro"
    ? ro(n, "poziție", "poziții")
    : ru(n, "позиция", "позиции", "позиций");
}

export function models(n: number, lang: Lang) {
  return lang === "ro"
    ? ro(n, "model", "modele")
    : ru(n, "модель", "модели", "моделей");
}

export function fabrics(n: number, lang: Lang) {
  return lang === "ro"
    ? ro(n, "textil", "textile")
    : ru(n, "ткань", "ткани", "тканей");
}
