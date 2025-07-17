export class BowlingScoreboardRepository {
    private rolls: number[] = [];
    getRolls() {
      return this.rolls;
    }
    saveRoll(roll: number) {
     this.rolls.push(roll);
    }
    constructor(){}
}