export class ModuleSerivce {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  mixGroups(shuffledUsers: any[]) {
    const groups = [];
    let count = shuffledUsers.length;
    if (count % 3 == 0) {
      for (let i = 0; i < shuffledUsers.length; i += 3) {
        groups.push(shuffledUsers.slice(i, i + 3));
      }
    } else {
      for (let i = 0; i < shuffledUsers.length; ) {
        if (count > 4) {
          groups.push(shuffledUsers.slice(i, i + 3));
          i += 3;
          count = count - 3;
        } else {
          groups.push(shuffledUsers.slice(i, i + 2));
          i += 2;
          count = count - 2;
        }
      }
    }
    return groups;
  }
  shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}
