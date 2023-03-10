const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/product.json";

exports.getAll = (request, response) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = data ? JSON.parse(data) : [];

    return response.json({ status: true, result: savedData });
  });
};

exports.create = (request, response) => {
  const { productName, price, InStock, categoryId, thumbImage, images, description } =
    request.body;

  if (!productName) {
    return response.json({ status: false, message: "product name oruulna uu" });
  }
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const newObj = {
      id: uuid.v4(),
      productName,
      price,
      InStock,
      categoryId,
      thumbImage,
      images,
      description,
      createdDate: Date.now(),
    };

    parsedData.push(newObj);

    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, result: parsedData });
    });
  });
};

exports.update = (request, response) => {
  const { productName, price, InStock, categoryId, thumbImage, images, description } =
    request.body;
  const { id } = request.params;

  // console.log(productName, price, InStock, categoryId, thumbImage, images);
  console.log(id);

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.status(500).json({ error: readErr });
    }

    const parsedData = JSON.parse(data);

    const updatedData = parsedData.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          productName,
          price: price,
          InStock,
          categoryId,
          thumbImage,
          images,
          description,
        };
      } else {
        return product;
      }
    });

    fs.writeFile(dataFile, JSON.stringify(updatedData), (writeErr) => {
      if (writeErr) {
        return response.status(500).json({ error: writeErr });
      }

      console.log(updatedData);

      const updatedProduct = updatedData.find((product) => product.id === id);

      return response.json({ status: true, result: updatedProduct });
    });
  });
};

exports.delete = (request, response) => {
  const { id } = request.params;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const deletedData = parsedData.filter((e) => e.id != id);

    fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, result: deletedData });
    });
  });
};
