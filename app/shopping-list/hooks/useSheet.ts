import { localStorageKey, setLocalStorage } from '@/lib/localStorage';
import { ShoppingListModel } from '@/types/shopping-list';
import { useState } from 'react';

export const useSheets = () => {
  // シート一覧の状態管理
  const [sheets, setSheets] = useState<ShoppingListModel[]>([]);

  // シート一覧を修正する
  const updateSheets = (next: ShoppingListModel[]) => {
    setSheets(next);
    setLocalStorage(localStorageKey.SHOPPING_LIST, next);
  };

  // シートを追加する
  const addSheet = (name: string) => {
    const newList = {
      id: crypto.randomUUID(),
      name: name,
      items: [],
      categories: [],
      shareId: null,
    };
    updateSheets([...sheets, newList]);
  };

  // シートを修正する
  const editSheet = ({ id, name }: { id: string; name: string }) => {
    const next = sheets.map((item) => {
      if (item.id === id) {
        return { ...item, name };
      }
      return item;
    });
    updateSheets(next);
  };

  // シートを削除する
  const deleteSheet = (id: string) => {
    const next = sheets.filter((item) => item.id !== id);
    updateSheets(next);
  };

  return {
    sheets,
    setSheets,
    addSheet,
    editSheet,
    deleteSheet,
  };
};
