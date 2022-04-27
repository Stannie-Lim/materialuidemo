const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const faker = require('faker');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/mui_db');

const Product = db.define('product', {
  name: Sequelize.DataTypes.STRING,
  imageUrl: Sequelize.DataTypes.STRING,
  description: Sequelize.DataTypes.STRING,
  rating: Sequelize.DataTypes.DECIMAL,
  price: Sequelize.DataTypes.DECIMAL,
});

const Category = db.define('category', {
  name: Sequelize.DataTypes.STRING,
});

Category.hasMany(Product);
Product.belongsTo(Category);

const syncAndSeed = async() => {
  try {
    await db.sync({ force: true });

    const categories = await Promise.all(
      Array(3).fill().map(() => Category.create({
        name: faker.commerce.department(),
      }))
    );

    await Promise.all(
      Array(1000).fill().map(() => Product.create({
        name: faker.commerce.product(),
        imageUrl: faker.image.abstract(),
        description: faker.commerce.productDescription(),
        rating: (Math.random() * 5).toFixed(1),
        price: (Math.random() * 100).toFixed(2),
        categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

const app = express();

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (_, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/categories', async (_, res) => res.send(await Category.findAll({ include: Product })));
app.get('/api/products', async (_, res) => res.send(await Product.findAll({ include: Category })));

app.post('/api/products', async ({ body: { name, imageUrl, description, rating, price, categoryId } }, res) => res.send(await Product.create(({ name, imageUrl, description, rating, price, categoryId }))));

app.put('/api/products/:id', async ({ body: { name, imageUrl, description, rating, price, categoryId }, params: { id } }, res) => {
  const product = await Product.findByPk(id);
  await product.update({ name, imageUrl, description, rating, price, categoryId });
  res.send(product);
});

const port = process.env.PORT || 3000;

syncAndSeed().then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)));