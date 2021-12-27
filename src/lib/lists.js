export const getList = (lists, id) => {
    if (!lists) { return null; }
    const foundList = lists['mine'].concat(lists['shared']).find(i => i.id == id);
    if (!foundList) { return null; }
    return foundList;
}