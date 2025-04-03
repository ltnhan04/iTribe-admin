export interface Category {
  _id: string;
  category_name: string;
  parent_category?: ParentCategory;
}
export interface ParentCategory {
  _id: string;
  name: string;
}
