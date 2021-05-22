const removeDuplicates = (arr: string[]): string[] => {
    return arr.reduce((acc: string[], str: string) => {
      if (acc.indexOf(str) === -1) {
        acc.push(str);
      }
      return acc;
    }, []);
  };

  export {removeDuplicates}