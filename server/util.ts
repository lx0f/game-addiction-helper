import _ from "lodash";

export function prettify(slug: string) {
    return slug.split('-').map(word => _.capitalize(word)).join(' ');
}

export function removeExtension(file: string) {
    return file.slice(0, file.length - 3);
}