import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartBtn from './HeaderCartBtn';

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartBtn onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of food" />
            </div>
        </>
    );
};

export default Header;
