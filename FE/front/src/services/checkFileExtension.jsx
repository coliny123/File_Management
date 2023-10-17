import React from 'react'
export function checkFileExtension(fileList) {
    if (fileList[0]?.type === 'application/haansofthwp') {
        return 'hwp'
    } else if (fileList[0]?.type === 'application/pdf') {
        return 'pdf'
    } else if (fileList[0]?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return 'word'
    } else if (fileList[0]?.type === 'application/vnd.ms-powerpoint') {
        return 'ppt'
    } else {
        return fileList[0]?.type
    }
}
