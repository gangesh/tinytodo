import {tags} from '$lib/stores';

export const addTag = (tag, tags$) => {
    if (tags$.indexOf(tag) !== -1) { return; }
    tags$.push(tag);
    tags.set(tags$);
}

export const removeTag = (tag, tags$) => {
    tags$ = tags$.filter(i => i !== tag);
    tags.set(tags$);
}