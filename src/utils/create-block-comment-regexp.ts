import { combineRegexp } from "./combine-regexp"

export const createBlockCommentRegex = (input: RegExp[]): RegExp => {
	return combineRegexp([
		// /**
		/\/\*\*/,
		...input.map((element: RegExp): RegExp => {
			return combineRegexp([
				// {whitespace}*{whitespace}
				/\s+\*\s+/,
				element,
			]);
		}),
		// {whitespace}*/
		/\s+\*\//,
	]) 
}

//  // {whitespace}*{whitespace}{any text}
//  /\s+\*\s+.*/,
//  // {whitespace}*{whitespace}
//  /\s+\*\s+/,
//  // {whitespace}*{whitespace}Created by {any name} on {any date}"
//  /\s+\*\s+Created by .* on .*/,
//  // "{whitespace}*{whitespace}Copyright © {any date} {any name}. All rights reserved."
//  /\s+\*\s+Copyright © .* .*\. All rights reserved\./,
