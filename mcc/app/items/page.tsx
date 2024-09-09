"use client";

import { useEffect, useState } from "react";
import Item from "@/app/components/ItemCard";
import { ItemProps } from "@/app/types/Item";
import { getData, addData, deleteStore } from "@/app/utils/indexedDb";
import Link from "next/link";

const NewItemModal: React.FC<{
  toggleModal: () => void;
}> = ({ toggleModal }) => {
  const [newItem, setNewItem] = useState<ItemProps>({
    id: "",
    name: "",
    image: "",
    craftable: false,
  });

  const handleAddNewItem = async () => {
    newItem.id = newItem.name.toLowerCase().replace(/\s/g, "_");
    if (newItem.image === "") {
      newItem.image =
        "data:image/webp;base64,UklGRuYDAABXRUJQVlA4TNoDAAAvK8FKEGegKJIUh8IL/l1lLqfn2VAUAIRjRdK/gQBeGnB7/JRGksIQLD3Qf2WPygo3/wFAxJB9TAk/TAJgU/OfPtOg8vLts0hdApLbRpKkaEv//3RmRFQvM+eI/k9AtThseABgw3VGO2HYMb6xfIQjOiM5fMRVVFfx3OSoTdTXKsouhrTd+F080f8HSMoFkCrjgFupDV2pFyalJmFWB5syyaoMuzHkONveRs43aZ3toU8wIOB+APkAscypdzedMZ2vkarttnc8whxg8/bC3CA5h5E2iBIV/k+kHBARDty2cSRHXvTrdZLNA1B70W9xsmo5k0HKaKG5innMybPYmQxSRox/lUNn/ztWJKQz/4kqvyI0WJrEHPYJDWaz7H8NfkWUDf7nFn1SUsoPadFKUHketIo0mhncqcBHKfdzK6mBFjokfxkJjSPrF7kWidaGnz/L/hxKQ7JPjZAHwcYoV0mnMG4ZV7BxKm+lqZamW0mfBXJgLEjk2LkwdhE5m4+B4aksuigqpmEESeH4lvm9yEEr2b5mr92VaH9GHgRvPXYxDCqeIy86dlNT91SAV6DbySuw/H7QcjUwsLZo8lg4ZBwatGl9DvkdEf5WiSErgnISGn1FBaVgVokzQanjWT4olVXqz6Vopr+Iq34e+JBVjjwoQ63kkYoMcyG9IYISJCQOQCq2XIj7PWdDnmY5keycY8UlZFFM3SjbFWMaRqExyhSV6wIoId90gi57qKAQCk+CnaCTGTFOmblpnQ6sfGTFGwdBVY529Q38KiUB06m+gVIUdBgZelgFKikMX9tpU7zAyNCcDG1tThMCsq0cEf/P/4pZpEGmI9yTqrSpY6R5/fdeu4oCo0Hxpmc5sJpnxIRWHtN18FFda86PeHHG//xXQ3zjpJHveYzmO2aNFg2F2qQ0qCdU/QJSoJ7wek3Os3UofL6yxNXdGgou+eEM6gl4fXxmW4mlOXhmAwnz4HbuARItvTxsRqqQznk8QQMfbnkhPdk/CV7kORldtM+AB9eQojOsOgqAMeNTspS/o8v9NCTrTL5Z0ZN8cBLu9wSqKOSpMMSpODgJ41OyVEzGbRolIDM5kbxvl8KUhI8MCInTRnrk1VBuMwgyDNomvGf9LQLnY5cTuysSswecDGxlmhErF+o0uoILxZYbkfEhxFEBjUsh9TuBoz00nKo8beYsCq2+kmdgwRahhTDd/ZZ0nUpjC5liMQppIS5snDVWc0lGvziTsot0LI0Y4rFuNiIfUh1Q7tsUaTjUOfxPvzLINtmdjOBQaqJiTMrf6BTXPXmyvn7yPceHEzOi/hqmAQ==";
    }

    const id = await addData<ItemProps>("mcc", "items", newItem);
    setNewItem({ ...newItem, id: id.toString() });
    toggleModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <div className="flex justify-between">
          <p className="text-lg font-bold">Adding New Item</p>
          <button className="text-lg" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-lg p-2"
            value={newItem?.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image URL"
            className="rounded-lg p-2"
          />
          <label htmlFor="craftable">Craftable</label>
          <input type="checkbox" id="craftable" name="craftable" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleAddNewItem}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Items() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedItems = await getData<ItemProps>("mcc", "items");
      if (storedItems) {
        setItems(storedItems);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [items]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const refreshItems = async () => {
    alert(
      "Are you sure you want to refresh items? This will remove all items except the default items."
    );
    setIsLoading(true);
    deleteStore("mcc", "items");
    setIsLoading(false);
  };

  const deleteAllItems = () => {
    alert("Are you sure you want to delete all items?");
    const db = indexedDB.open("mcc");
    db.onsuccess = () => {
      const transaction = db.result.transaction("items", "readwrite");
      const objectStore = transaction.objectStore("items");
      objectStore.clear();
      setItems([]);
    };
  };

  return (
    <div className="w-4/5 mx-auto m-5 bg-orange-500/75 rounded-xl">
      <div className="p-2 rounded-xl bg-orange-500/80 flex justify-between items-center">
        <p className="font-bold text-lg">Current Inventory</p>
        <div className="block">
          <button
            className="bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            type="button"
            onClick={toggleModal}
          >
            <span className="font-bold">&#43;</span>
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            type="button"
            onClick={refreshItems}
          >
            <span className="font-bold">&#8634;</span>
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={deleteAllItems}
          >
            <span className="font-bold">&#128465;</span>
          </button>
        </div>
        {isModalOpen && <NewItemModal toggleModal={toggleModal} />}
      </div>
      <div className="p-2 ">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {items.length === 0 ? (
              <div className="col-span-5 text-center">
                No items found. Add some items to get started.
              </div>
            ) : (
              items
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <Link href={`/items/${item.id}`} key={item.id}>
                    <Item {...item} />
                  </Link>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
