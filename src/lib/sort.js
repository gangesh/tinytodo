export const sort = (items, order) => {
    switch(order) {
        case 'CREATED':
            return items.sort((a,b) => a.createdOn < b.createdOn ? 1 : -1);
        case 'MODIFIED':
            return items.sort((a,b) => a.updatedOn < b.updatedOn ? 1 : -1);
        case 'PRIORITY':
            // No reliable way to sort with 0s. Force sorting manually.
            const order2 = items.filter(i => i.priority === 2);
            const order1 = items.filter(i => i.priority === 1);
            const order0 = items.filter(i => i.priority === 0);
            const orderNeg = items.filter(i => i.priority === -1);
            return order2.concat(order1, order0, orderNeg);
        case 'DUE':
            return items.sort((a,b) => {
                if (!a.due) { return 1; }
                if (a.due && b.due) { return a.due > b.due ? 1 : -1; }
                return -1;
            });
    }
}