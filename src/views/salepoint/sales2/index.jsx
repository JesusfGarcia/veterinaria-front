import React from "react";

import Modal from "../../../components/dialog";

import Table from "../../../components/table";

export default function Sales2() {
  const [isOpen, setIsOpen] = React.useState(false);

  const titles = [
    {
      label: "producto",
      key: "name",
    },

    {
      label: "Numero de compra",
      key: "orderId",
    },

    {
      label: "Cantidad",
      key: "quantity",
    },
    {
      label: "Total",
      key: "total",
    },

    {
      label: "Ver detalles",
      type: "actions",
      actions: [
        {
          label: "see",
          onClick: () => setIsOpen(true),
        },
      ],
    },
  ];

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Table columns={titles} data={data} />
      <Modal
        title="Detalles de compra"
        isOpen={isOpen}
        onClose={onClose}
      >
        :D
      </Modal>
    </div>
  );
}

const data = [
  {
    name: "nexgar 15-30",
    orderId: "862920",
    quantity: "2",
    total: "1380",
  },
  {
    name: "cirugia",
    orderId: "862920",
    quantity: "2",
    total: "3840",
  },
];
