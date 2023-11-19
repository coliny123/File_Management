import React from 'react'

export function checkFileExtension(fileList) {
    const fileFullExtension = fileList[0].type;
    if (fileList[0].object.name.slice(-3) === 'hwp') {
        return 'hwp'
    }
    console.log(fileList[0].type)
    const fileExtensionObject = {
        'application/haansofthwp': 'hwp',
        'application/haansoftpdf': 'hwp',
        'application/pdf': 'pdf',
        'application/haansoftshow': 'pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt',
    };

    return fileExtensionObject[fileFullExtension] || false;
}
