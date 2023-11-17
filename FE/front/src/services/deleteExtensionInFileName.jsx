export const deleteExtensionsInFileName = (fileName) => {
    if (fileName === undefined) {
        return '';
    }
    return fileName.substring(0, fileName.lastIndexOf('.'));
}