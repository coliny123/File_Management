import React from 'react'
export function checkFileExtension(fileList) {
    const fileFullExtension = fileList[0].type;
    const fileExtensionObject = {
        'application/haansofthwp': 'hwp',
        'application/pdf': 'pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
        'application/vnd.ms-powerpoint': 'ppt',
    };

    return fileExtensionObject[fileFullExtension] || false;
}
// import React from 'react'
// export function checkFileExtension(fileList) {

//     if (fileList[0]?.type === 'application/haansofthwp') {
//         return 'hwp'
//     } else if (fileList[0]?.type === 'application/pdf') {
//         return 'pdf'
//     } else if (fileList[0]?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//         return 'word'
//     } else if (fileList[0]?.type === 'application/vnd.ms-powerpoint') {
//         return 'ppt'
//     } else {
//         return fileList[0]?.type
//     }
// }
