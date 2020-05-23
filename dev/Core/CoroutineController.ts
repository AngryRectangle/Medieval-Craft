class Coroutine {
    public time = 0;
    public action: Function;
    public isRepeating = false;
    public timeToActivation = 1;
    public data: any;

    public constructor(action: Function, timeToActivation: number, isRepeating: boolean) {
        this.action = action;
        this.timeToActivation = timeToActivation;
        this.isRepeating = isRepeating;
    }
}

class CoroutineController {
    public coroutines: Array < Coroutine > = new Array();

    public addCoroutine(coroutine: Coroutine): void {
        this.coroutines.push(coroutine);
    }
    public removeCoroutine(index: number): void {
        this.coroutines.splice(index, 1);
    }
    public update(): void {
        for (let i = 0; i < this.coroutines.length; i++) {
            this.coroutines[i].time++;
            if (!(this.coroutines[i].time % this.coroutines[i].timeToActivation))
                if ( this.coroutines[i].action()||this.coroutines[i].isRepeating == false) {
                    this.removeCoroutine(i);
                    i--;
                }
        }
    }
}