export const imageRules = [
  { required: true, message: "Please upload at least one image" },
];

export const priceRules = [
  { required: true, message: "Please enter a price" },
  {
    min: 0,
    message: "Price cannot be negative",
  },
];

export const descriptionRules = [
  { required: true, message: "Please enter a description" },
  {
    min: 10,
    message: "Description must be at least 10 characters long",
  },
  {
    max: 1000,
    message: "Description cannot exceed 1000 characters",
  },
];

export const categoryRules = [
  { required: true, message: "Please select a category" },
];

export const slugRules = [
  { required: true, message: "Please enter a slug" },
  {
    pattern: /^(?!-)[A-Za-z0-9]+(-[A-Za-z0-9]+)*(?<!-)$/,
    message: "Slug must be in the format: iphone-16",
  },
];