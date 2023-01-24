export class Range {
  constructor(public start: number, public end: number) {
    if (!(start < end)) {
      throw new Error("Invalid range");
    }
    this.start = start;
    this.end = end;
  }

  toString() {
    return `[${this.start},${this.end}]`;
  }

  contains(value: number) {
    return this.start <= value && value <= this.end;
  }
}
