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

export interface Profile {
	name: string;
	duration: number;
	children?: Profile[];
}

export function profile(entries: LogInputEntry[], parent?: string): Profile[] {
	// console.log(parent, entries);
	const stack: Profile[] = [];
	while (entries.length > 0) {
		const first = entries[0];
		const blockEndIndex = entries.findIndex(
			v => v.name === first.name && v.type === LogInputEntryType.End
		);
		const block = entries.slice(1, blockEndIndex);
		// console.log('block', block);
		if (block.length > 0)
			stack.push({
				name: first.name,
				duration:
					entries.find(
						v => v.name === first.name && v.type === LogInputEntryType.End
					)!.ts - first.ts,
				children: profile(block, first.name)
			});
		else
			stack.push({ name: first.name, duration: entries.at(-1)!.ts - first.ts });
		entries = entries.slice(blockEndIndex + 1, undefined);
		// console.log('stack', stack);
	}
	return stack;
}

console.log(
	JSON.stringify(
		profile(
			`
1, main, Start
2, A, Start
3, B, Start
4, B, End
5, A, End
6, C, Start
7, C, End
8, main, End`
				.trim()
				.split('\n')
				.map(v => v.split(', ') as LogInputEntryRow)
				.map(
					v =>
						({
							ts: parseInt(v[0]),
							name: v[1],
							type: v[2]
						}) satisfies LogInputEntry
				)
				.sort((a, b) => a.ts - b.ts)
		),
		undefined,
		2
	)
);
