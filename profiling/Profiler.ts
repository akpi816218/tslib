type LogInputEntryType = 'Start' | 'End';

type LogInputEntryRow = [string, string, LogInputEntryType];

interface LogInputEntry {
	ts: number;
	name: string;
	type: LogInputEntryType;
}

interface Profile {
	name: string;
	duration: number;
	children?: Profile[];
}

function findEndIndex(entries: LogInputEntry[], start: LogInputEntry): number {
	// return entries.findIndex(v => v.name === start.name && v.type === 'End');
}

function profile(entries: LogInputEntry[]): Profile[] {
	if (entries.length === 0) return [];
	if (entries.length === 2)
		return [{ name: entries[0].name, duration: entries[1].ts - entries[0].ts }];

	const stack: Profile[] = [];

	while (entries.length > 0) {
		const first = entries[0];

		const lastIndex = findEndIndex(entries, first);

		if (lastIndex === -1) throw new Error('Invalid input');

		const block = entries.slice(1, lastIndex);

		stack.push({
			name: first.name,
			duration: entries[lastIndex].ts - first.ts,
			children: profile(block)
		});

		entries = entries.slice(lastIndex + 1, undefined);
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
6.4, C, Start
6.7, C, End
7, C, End
8, main, End`
				.trim()
				.split('\n')
				.map(v => v.split(', ') as LogInputEntryRow)
				.map(
					v =>
						({
							ts: parseFloat(v[0]),
							name: v[1],
							type: v[2]
						}) satisfies LogInputEntry
				)
		),
		undefined,
		2
	)
);
