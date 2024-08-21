export function deepClone(value: any) {
    if (!value) {
        return value;
    }
    return JSON.parse(JSON.stringify(value));
}

export function copyToClipboard(text: string) {
    // Gestion de secours pour les navigateurs non compatibles avec l'API Clipboard
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

}

export function firestoreDocsToArray(docs: any[]): any[] {
    const returnArr: any[] = [];
    let index = 0;
    docs.forEach(d => {
        if (d.exists) {
            const data = d.data();
            data.documentId = d.id;
            data.index = index;
            returnArr.push(data);
            index++;
        }
    })

    return returnArr;
}

