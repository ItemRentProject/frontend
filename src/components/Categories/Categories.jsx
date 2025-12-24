import CategoryCard from "../CategoryCard/CategoryCard.jsx"
import camera from "../temp/camera.png"
import car from "../temp/car.png"
import comp from "../temp/comp.png"
import game from "../temp/game.png"
import instruments from "../temp/instruments.png"
import sport from "../temp/sport.png"
import styles from "./Categories.module.css"


const Categories = () => {
    return(
        <div className={styles.categories}>
            <div className={styles.cardCtn}>
                <h3 className={styles.text}>Популярные категории</h3>
                <div className={styles.icons}>
                    <CategoryCard title="Инструменты" image={instruments} variant="instruments"/>
                    <CategoryCard title="Электроника" image={comp} variant="comp"/>
                    <CategoryCard title="Фототехника" image={camera} variant="camera"/>
                    <CategoryCard title="Игры" image={game} variant="game"/>
                    <CategoryCard title="Спорт" image={sport} variant="sport"/>
                    <CategoryCard title="Транспорт" image={car} variant="car"/>
                </div>
            </div>
        </div>
    )
}

export default Categories