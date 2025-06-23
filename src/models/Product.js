const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
      nome: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      stock: { type: DataTypes.INTEGER, defaultValue: 0 },
      description: { type: DataTypes.TEXT },
      preco: { type: DataTypes.FLOAT, allowNull: false },
      price_with_discount: { type: DataTypes.FLOAT, allowNull: false },
    }, {
      sequelize,
      tableName: 'produtos',
    });
  }

  static associate(models) {
    this.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'images' });
    this.hasMany(models.ProductOption, { foreignKey: 'product_id', as: 'options' });
    this.belongsToMany(models.Category, { foreignKey: 'product_id', through: 'produtos_categorias', as: 'categories' });
  }
}

module.exports = Product;