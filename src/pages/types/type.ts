export interface User {
  id: number;
  email: String;
  school: String;
  textbooks: Textbook[]
  goods: Good[]
}

export interface Textbook {
  id: number;
  discription: string;
  schoolCode: string;
  sellerId: number;
  textbookImg: string;
  textbookName: string;
  goods:Good[]
}

export interface Good {
  id: number;
  sellerId: number;
  seller: User;
  textbookId: number;
  textbook: Textbook
}
