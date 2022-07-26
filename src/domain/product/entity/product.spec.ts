import Product from "./product";
import ProductB from "./product-b";

describe("Product unit tests", () => {
  it("should throw error when id is empty on product A", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Product: Id is required");
  });

  it("should throw error when id is empty on product B", () => {
    expect(() => {
      const product = new ProductB("", "Product 1", 100);
    }).toThrowError("Product: Id is required");
  });

  it("should throw error when name is empty on product A", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Product: Name is required");
  });

  it("should throw error when name is empty on product B", () => {
    expect(() => {
      const product = new ProductB("123", "", 100);
    }).toThrowError("Product: Name is required");
  });

  it("should throw error when name and id are empty on product A", () => {
    expect(() => {
      const product = new Product("", "", 100);
    }).toThrowError("Product: Id is required,Product: Name is required");
  });

  it("should throw error when name and id are empty on product B", () => {
    expect(() => {
      const product = new ProductB("", "", 100);
    }).toThrowError("Product: Id is required,Product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("Product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
