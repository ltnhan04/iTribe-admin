export const imageRules = [
  { required: true, message: "Please upload at least one image" },
];

export const priceRules = [
  { required: true, message: "Please enter product price" },
  {
    min: 0,
    message: "Price cannot be negative",
  },
];

export const descriptionRules = [
  { required: true, message: "Please enter product description" },
  {
    min: 10,
    message: "Description must be at least 10 characters long",
  },
  {
    max: 1000,
    message: "Description cannot exceed 1000 characters",
  },
];

export const nameRules = [
  { required: true, message: "Please select a name of product" },
];
