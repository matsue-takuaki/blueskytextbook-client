export interface User {
  id: number;
  username: String;
  email: String;
  photoUrl: String;
  school: String;
  textbooks: Textbook[];
  goods: Good[];
}

export default interface Textbook {
  id: number;
  discription: string;
  schoolCode: string;
  sellerId: number;
  textbookImg: string;
  textbookName: string;
  seller: User;
  goods: Good[];
}

export interface Good {
  id: number;
  sellerId: number;
  seller: User;
  textbookId: number;
  textbook: Textbook;
}
