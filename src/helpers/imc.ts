export type Level = {
    title: string;
    color: string;
    icon: 'up' | 'down';
    imc: number[];
    yourImc?: number;
}

export const levels: Level[] = [
    { title: 'Magro', color: '#96a3a4', icon: 'down', imc: [0, 18.5] },
    { title: 'Peso ideal', color: '#7ed321', icon: 'up', imc: [18.6, 24.9] },
    { title: 'Sobrepeso', color: '#e2b039', icon: 'down', imc: [25, 29.9] },
    { title: 'Obesidade', color: '#c3423f', icon: 'down', imc: [30, 99] },
];

export const calculateImc = (height: number, weight: number): Level | null => {
    const imc = weight / (height * height);

    for (let i in levels) {
        if (imc >= levels[i].imc[0] && imc < levels[i].imc[1]) {
            return { ...levels[i], yourImc: parseFloat(imc.toFixed(2)) };
        }
    }

    return null; // Retorna nulo se nenhum nível corresponder
};
