export enum LogInputEntryType {
	Start = 'Start',
	End = 'End'
}

export type LogInputEntryRow = [string, string, LogInputEntryType];

export interface LogInputEntry {
	ts: number;
	name: string;
	type: LogInputEntryType;
}

export function profile(input: string) {
	const inputEntries = input
		.trim()
		.split('\n')
		.map(v => v.split(', ') as LogInputEntryRow)
		.map(v => {
			return {
				ts: parseInt(v[0]),
				name: v[1],
				type: v[2]
			} satisfies LogInputEntry;
		})
		.sort((a, b) => a.ts - b.ts);
	return inputEntries;
}

console.log(
	profile(`
1, main, Start
2, A, Start
3, B, Start
4, B, End
5, A, End
6, C, Start
7, C, End
8, main, End`)
);
