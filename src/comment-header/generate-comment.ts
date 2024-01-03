export const generateComment = ({
	fileName,
	authorName,
}: {
	fileName: string,
	authorName: string,
}): string => {
	const currentTime = new Date();
	const year: string = currentTime.getFullYear().toString();
	const monthNum: number = (currentTime.getMonth() + 1);
	const dateNum: number = currentTime.getDate(); 

	const month = monthNum.toString().padStart(2, "0")
	const date = dateNum.toString().padStart(2, "0")

	return (
		"/**\n" +
		` * ${fileName}\n` +
		" *\n" +
		` * Created by ${authorName} on ${date}-${month}-${year}\n` +
		` * Copyright © ${year} ${authorName}. All rights reserved.\n` +
		" */\n\n"
	);
};
