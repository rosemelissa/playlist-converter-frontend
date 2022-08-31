export default function formatDuraction(milliseconds: number): string {
    let totalSeconds: number = milliseconds/1000;
    totalSeconds = Math.round(totalSeconds);
    const fullMinutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds%60;
    if (seconds === 0) {
        return `${fullMinutes}:${seconds}0`
    } else {
        return `${fullMinutes}:${seconds}`;
    }
}