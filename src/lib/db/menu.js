import clientPromise from '@/lib/mongodb'

async function getCollection() {
    const client = await clientPromise;
    return client.db('store_pilot').collection('menu');
}

export async function getMenus(ownerId, storeId) {
    const col = await getCollection();
    const doc = await col.findOne({ ownerId, storeId });

    if (!doc) return [];

    return doc.menu || [];
};