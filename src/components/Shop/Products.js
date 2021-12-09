import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy_products = [
    {
        id: 1,
        price: 6,
        title: 'book',
        description: 'This is a first product - amazing!',
    },
    {
        id: 2,
        price: 9,
        title: 'books',
        description: 'This is a first product - amazing!',
    },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {dummy_products.map((product) => (
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Products;
