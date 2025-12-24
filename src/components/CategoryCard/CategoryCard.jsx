import styles from "./CategoryCard.module.css";

const CategoryCard = ({title, image, variant}) => {
    const cardClasses = `${styles.pic} ${styles[variant] || ''}`;
    return(
        <div className={styles.card}>
            <div className={cardClasses}>
                <img className={styles.icon} src={image} alt={title}></img>
            </div>
            <span>{title}</span>
        </div>
    )
}

export default CategoryCard
