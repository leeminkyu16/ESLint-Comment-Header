import * as path from "path";

export const generateFileNameForComment = ({
    fullFilePath,
    baseFileNamesToShowParentDirectory = [],
}: {
    fullFilePath: string,
    baseFileNamesToShowParentDirectory: RegExp[]
}): string => {
    const parsedPath = path.parse(fullFilePath)

    const showParentDirectory: boolean = baseFileNamesToShowParentDirectory.some((regexp) => {
        return regexp.test(parsedPath.base)
    })

    if (showParentDirectory) {
        return `${path.basename(parsedPath.dir)}/${parsedPath.base}`
    }
    else {
        return parsedPath.base
    }
}
