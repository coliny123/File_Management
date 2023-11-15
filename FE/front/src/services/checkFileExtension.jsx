import React from 'react'

export function checkFileExtension(fileList) {
    const fileFullExtension = fileList[0].type;
    const fileExtensionObject = {
        'application/haansofthwp': 'hwp',
        'application/pdf': 'pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt',
    };

    return fileExtensionObject[fileFullExtension] || false;
}
