import { Nullable } from './../types/Nullable';
import { TSESLint } from "@typescript-eslint/utils";
import { isCorrectHeader } from "./is-correct-header";
import { generateComment } from "./generate-comment";
import { generateFileNameForComment } from "./generate-filename-for-comment";
import * as os from "os"

const defaultAuthorName: string = os.hostname()
const defaultFileNamesToShowParentDirectory: string[] = ["index\..*"]

export const commentHeader: TSESLint.RuleModule<"comment-header", [{
	authorName: Nullable<string>,
	regexFileNamesToShowParentDirectory: Nullable<string[]>,
},]> = {
	defaultOptions: [{
		authorName: defaultAuthorName,
		regexFileNamesToShowParentDirectory: defaultFileNamesToShowParentDirectory,
	}],
	meta: {
		type: "layout",
		docs: {
			description: "Ensure that each file has a header with proper formatting",
		},
		fixable: "whitespace",
		schema: [
			{
				type: "object",
				properties: {
					authorName: { type: ["string", "null"] },
					regexFileNamesToShowParentDirectory: { 
						type: ["array", "null"],
						items: {
							type: "string",
						},
					},
				}
			},
		],
		messages: {
			"comment-header": "Missing header in this file."
		}
	},
	create: (context) => {
		return {
			Program: (node): void => {
				const {
					authorName: nullableAuthorName = null,
					regexFileNamesToShowParentDirectory: nullableRegexFileNamesToShowParentDirectory = null,
				} = context.options[0]
				const authorName: string = nullableAuthorName || defaultAuthorName
				const regexFileNamesToShowParentDirectory: string[] = nullableRegexFileNamesToShowParentDirectory || defaultFileNamesToShowParentDirectory

				const sourceCode: string = context.sourceCode.getText();
				if (!isCorrectHeader(sourceCode)) {
					context.report(
						{
							node,
							messageId: "comment-header",
							fix: (fixer) => {
								const baseFileNamesToShowParentDirectory: RegExp[] = (
									regexFileNamesToShowParentDirectory
								).map(
									element => new RegExp(element)
								)

								return fixer.insertTextBefore(
									node,
									generateComment({
										fileName: generateFileNameForComment({
											fullFilePath: context.filename,
											baseFileNamesToShowParentDirectory: baseFileNamesToShowParentDirectory,
										}),
										authorName: authorName,
									})
								);
							}
						});
				}
			}
		};
	}
};

