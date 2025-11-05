import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { Store } from "../@types/store";
import storesData from "../data/stores.json";
const stores = storesData as StoreItem[];

type StoreItem = {
  store: Store;
  code: string;
  name: string;
  icon: string;
};

type StoresModalProps = {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
};

export default function StoresModal({ store, setStore }: StoresModalProps) {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const storeElements = stores.map((s) => (
    <li key={s.store}>
      <button
        className="inline-flex w-full cursor-pointer items-center p-2 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={() => {
          setOpenModal(false);
          setStore(s.store);
          localStorage.setItem("store", s.store);
        }}
      >
        <img src={s.icon} alt="" className="me-2 size-7" />
        {s.name}
      </button>
    </li>
  ));

  return (
    <>
      <Button
        color="alternative"
        className="w-28 cursor-pointer truncate"
        onClick={() => setOpenModal(true)}
      >
        <img
          src={stores.find((s) => s.store === store)?.icon}
          alt=""
          className="me-2 size-6"
        />
        {store}
      </Button>

      <Modal
        show={openModal}
        size="4xl"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <ModalHeader />
        <ModalBody>
          <h4 className="mb-4 text-center text-lg leading-none font-medium text-gray-800 dark:text-gray-200">
            Select store:
          </h4>

          <ul className="grid grid-cols-1 gap-1 text-sm text-gray-800 sm:grid-cols-2 md:grid-cols-3 dark:text-gray-200">
            {storeElements}
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
}
