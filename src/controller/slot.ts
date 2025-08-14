interface PayTable {
    [symbol: number]: number[];
}
interface Config {
    reelsCount: number;
    rowsCount: number;
    reels: number[][];
    lines: number[][];
    symbols: PayTable;
}

interface LineWin {
    lineIndex: number;
    symbol: number;
    count: number;
    win: number;
}

interface SpinResult {
    stops: number[];
    screen: number[][];
    lineWins: LineWin[];
    totalWin: number;
}

export default class Slot {

    constructor(private config: Config) { }

    private getRandomReelIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private getStops(): number[] {
        const stops: number[] = [];

        for (let i = 0; i < this.config.reelsCount; i++) {
            stops.push(this.getRandomReelIndex(this.config.reels[i].length));
        }

        return stops;
    }

    private getRandomSymbol(stops: number[]): number[][] {
        const screen: number[][] = Array.from({ length: this.config.rowsCount }, () =>
            Array(this.config.reelsCount).fill(0)
        );
        for (let i = 0; i < this.config.reelsCount; i++) {
            for (let j = 0; j < this.config.rowsCount; j++) {
                const reelIndex: number = stops[i];
                const symbolIndex: number = (reelIndex + j) % this.config.reels[i].length;
                screen[j][i] = this.config.reels[i][symbolIndex];
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

    private checkWin(screen: number[][]): { lineWins: LineWin[]; totalWin: number } {
        const lineWins: LineWin[] = [];
        let totalWin = 0;

        this.config.lines.forEach((line, lineIndex) => {
            const firstSymbol = screen[line[0]][0];
            let matchCount = 1;

            for (let reel = 1; reel < this.config.reelsCount; reel++) {
                const symbol = screen[line[reel]][reel];
                if (symbol === firstSymbol) {
                    matchCount++;
                } else {
                    break;
                }
            }

            if (matchCount >= 3) {
                const winAmount = this.config.symbols[firstSymbol as keyof typeof this.config.symbols][matchCount - 1];
                lineWins.push({
                    lineIndex,
                    symbol: firstSymbol,
                    count: matchCount,
                    win: winAmount
                });
                totalWin += winAmount;
            }
        });

        return { lineWins, totalWin };
    }

    public spin(): SpinResult {
        const stops = this.getStops();
        const screen = this.getRandomSymbol(stops);
        this.showScreen(screen);
        const { totalWin, lineWins } = this.checkWin(screen);
        return {
            stops,
            screen,
            lineWins,
            totalWin
        };
    }
}