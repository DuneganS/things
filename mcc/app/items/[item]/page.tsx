"use client";
import { useEffect, useState } from "react";
import { getData, deleteData } from "@/app/utils/indexedDb";
import { ItemProps } from "@/app/types/Item";

const ItemPage = ({ params }: { params: any }) => {
  const itemId = params.item;
  const [item, setItem] = useState<ItemProps>({
    id: "",
    name: "",
    image: "",
    craftable: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedItems = await getData("mcc", "items");
      if (storedItems) {
        setItem(
          storedItems.find((item: any) => item.id === itemId) as ItemProps
        );
      }
    };
    fetchData();
  }, [itemId]);

  const handleItemDelete = () => {
    deleteData("mcc", "items", item.id);
    window.location.href = "/items";
  };

  return (
    <div className="w-4/5 mx-auto m-5 bg-orange-500/75 rounded">
      <button
        className="m-2 p-2 bg-orange-600/90 rounded-xl"
        onClick={handleItemDelete}
      >
        Delete {item?.name}
      </button>
      <form>
        <div>
          <h1 className="text-xl p-2">Item Info</h1>
          <div>
            <label className="p-2" htmlFor="name">
              ID
            </label>
            <input
              type="text"
              id="name"
              name="name"
              disabled
              className="rounded p-2"
              value={item?.id}
            />
          </div>
          <div>
            <label className="p-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              disabled
              className="rounded p-2"
              value={item?.name}
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl p-2">Crafting Recipe</h1>
        </div>
      </form>
    </div>
  );
};

export default ItemPage;
