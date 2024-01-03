import { createBlockCommentRegex } from "../utils/create-block-comment-regexp";

const regexPattern: RegExp = createBlockCommentRegex([
	/.*/,
	new RegExp(""),
	/Created by .* on .*/,
	/Copyright © [0-9]* .*\. All rights reserved\./
])

export const isCorrectHeader = (input: string): boolean => {
	return regexPattern.test(input);
};
