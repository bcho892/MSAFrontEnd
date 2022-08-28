export const formatTime = (seconds: number): string => {
    const output: number[] = [];
    let hours = Math.floor(seconds / 3600);
    output.push(hours);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    output.push(minutes);
    output.push(seconds);
    let formatted: string = "";
    for (let i = 0; i < output.length; ++i) {
        if (output[i] > 0)
            switch (i) {
                case 0:
                    formatted += `${output[i]} H `
                    break;
                case 1:
                    formatted += `${output[i]} M `
                    break;
                case 2:
                    formatted += `${output[i]} S`
                    break;
            };
    }
    return formatted;
}

export const extractProbability = (item: Record<string, string>): { name: string, probability: string } => {
    let category = Object.keys(item)[0];
    return { name: category, probability: Number(item[category]).toPrecision(4) };

}