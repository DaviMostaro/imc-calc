"use client";

import styles from './App.module.css';
import poweredImage from '../assets/powered.png';
import "../styles/globals.css";
import { useState } from 'react';
import { levels, calculateImc, Level } from '../helpers/imc';
import { GridItem } from '../components/GridItem';
import leftArrowImage from '../assets/leftarrow.png';

const App = () => {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if(heightField > 0 && weightField > 0) {
            setToShow(calculateImc(heightField, weightField));
        }else {
            alert('Preencha os campos corretamente.');
        }
    }

    const handleBackButton = () => {
        setToShow(null);
        setHeightField(0);
        setWeightField(0);
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={poweredImage.src} alt='' width={150} />
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC.</h1>
                    <p>IMC é a sigla para Índice de Massa Corperal, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

                    <input 
                        type='number'
                        placeholder='Digite sua altura em metros. Ex: 1.75'
                        value={heightField > 0 ? heightField : ''}
                        onChange={e => setHeightField(parseFloat(e.target.value))}
                        disabled={toShow !== null}
                    />
                    <input 
                        type='number'
                        placeholder='Digite seu peso em kg. Ex: 75.5'
                        value={weightField > 0 ? weightField : ''}
                        onChange={e => setWeightField(parseFloat(e.target.value))}
                        disabled={toShow !== null}
                    />

                    <button onClick={handleCalculateButton} disabled={toShow !== null}>Calcular</button>
                </div>
                <div className={styles.rightSide}>
                    {!toShow &&
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} />
                            ))}
                        </div>
                    }
                    {toShow &&
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImage.src} alt='' width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;
