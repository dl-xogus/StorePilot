import clientPromise from '@/lib/mongodb'

async function getCollection() {
    const client = await clientPromise;
    return client.db('store_pilot').collection('employee');
}

export async function getEmployee(ownerId) {
    const col = await getCollection();



    const docs = await col.findOne({ ownerId });

    if (!docs) return [];
    return docs.employees || [];
}