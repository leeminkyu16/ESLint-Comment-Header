export const combineRegexp = (input: RegExp[]): RegExp => {
	return new RegExp(
		input.map(element => element.source)
		.join("")
	)
}