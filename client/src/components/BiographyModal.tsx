import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import type { Artist } from "../@types/artist";

type BiographyModalProps = {
  artist: Artist;
};

export default function BiographyModal({ artist }: BiographyModalProps) {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    artist.biography && (
      <>
        <p
          title="Biography"
          className="cursor-pointer rounded-md border border-transparent p-1.5 text-white hover:border-gray-400"
          onClick={() => setOpenModal(true)}
          dangerouslySetInnerHTML={{ __html: artist.biography.summary }}
        ></p>

        <Modal
          dismissible
          show={openModal}
          size="3xl"
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader className="border-b-gray-200">Biography</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <p
                className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: artist.biography.content }}
              ></p>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </>
    )
  );
}
