import config from '../config/config.js';

export default class Slot {

    constructor() { }

    private getRandomReelIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private getRandomSymbol(stops: number[]): number[][] {
        const screen: number[][] = Array.from({ length: config.rowsCount }, () =>
            Array(config.reelsCount).fill(0)
        );
        for (let i = 0; i < config.reelsCount; i++) {
            for (let j = 0; j < config.rowsCount; j++) {
                const reelIndex: number = stops[i];
                const symbolIndex: number = (reelIndex + j) % config.reels[i].length;
                screen[j][i] = config.reels[i][symbolIndex];
            }
        }
        return screen;
    }

    private showScreen(screen: number[][]): void {
        console.log('Screen:');
        for (let row of screen) {
            console.log(row.map(symbol => symbol.toString().padStart(2, ' ')).join(' | '));
        }
    }

    private checkWin(screen: number[][]): number {
        let totalWin = 0;

        for (let li = 0; li < config.lines.length; li++) {
            const line = config.lines[li];

            const seq: number[] = line.map((rowIdx, reelIdx) => screen[rowIdx][reelIdx]);

            const first = seq[0];
            let matchCount = 1;

            for (let r = 1; r < seq.length; r++) {
                if (seq[r] === first) matchCount++;
                else {
                    break;
                }
            }

            const payTable = config.symbols[first as keyof typeof config.symbols] ?? [];
            const winAmount = payTable[matchCount - 1] ?? 0;

            if (winAmount > 0) {
                totalWin += winAmount;
                console.log(`Line ${li + 1} win: ${winAmount} (match count: ${matchCount})`);
            }
        }

        if (totalWin > 0) {
            console.log(`Total win: ${totalWin}`);
        } else {
            console.log('No win this spin.');
        }

        return totalWin;
    }


    public spin(): void {
        const stops: number[] = [];

        for (let i = 0; i < config.reelsCount; i++) {
            const reelIndex: number = this.getRandomReelIndex(config.reels[i].length);
            stops.push(reelIndex);
        }

        const screen: number[][] = this.getRandomSymbol(stops);

        this.showScreen(screen);

        this.checkWin(screen);
    }
}