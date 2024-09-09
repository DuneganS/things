import defaultItems from "./defaultItems.json";

function openDB(dbName: string, storeName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = (event) => {
            console.error("IndexedDB error:", event);
            reject(event);
        }

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(storeName)) {
            const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });

            defaultItems.forEach((item) => {
                objectStore.add(item);
            });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}

export async function addData<T>(dbName: string, storeName: string, data: T): Promise<number> {
    const db = await openDB(dbName, storeName);
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);


        request.onerror = (event) => {
            console.error("Error adding data:", event);
            reject(event);
        }

        request.onsuccess = () => {
            resolve(request.result as number);
        }
    });
}

export async function getData<T>(dbName: string, storeName: string): Promise<T[]> {
    const db = await openDB(dbName, storeName);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        
        request.onerror = (event) => {
            console.error("Error getting data:", event);
            reject(event);
        }

        request.onsuccess = () => {
            resolve(request.result as T[]);
        }
        return;

    });
}

export async function deleteData(dbName: string, storeName: string, id?: string): Promise<void> {
    const db = await openDB(dbName, storeName);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        if (!id) {
            store.clear();
            resolve();
            return;
        }

        const request = store.delete(id);

        request.onerror = (event) => {
            console.error("Error deleting data:", event);
            reject(event);
        }

        request.onsuccess = () => {
            resolve();
        }
    });
}

export async function deleteStore(dbName: string, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);

        request.onerror = (event) => {
            console.error("Error deleting store:", event);
            reject(event);
        }

        request.onsuccess = () => {
            resolve();
        }
    });
}