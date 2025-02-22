import { Icon } from "@iconify/react";
import Image from "next/image";

export const sectionItemsWithTeams = [
  {
    key: "home",
    title: "Home",
    href: "/",
    icon: (
      <Image
        src="/logo/sidebar/side1.svg"
        alt="Dashboard"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "transaction",
    title: "Transactions",
    href: "/admin/transaction",
    icon: (
      <Image
        src="/logo/sidebar/side2.svg"
        alt="Transactions"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "users",
    title: "Postal Users",
    href: "/admin/users",
    icon: (
      <Icon
        icon="solar:users-group-two-rounded-outline"
        width={20}
        height={20}
      />
    ),
  },
  {
    key: "self_operator",
    title: "Self Operator",
    href: "/admin/self_operator",
    icon: (
      <Image
        src="/logo/sidebar/side3.svg"
        alt="Transactions"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "requisition",
    title: "Requisition",
    href: "/admin/requisiton",
    icon: (
      <Image
        src="/logo/sidebar/side6.svg"
        alt="Transactions"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "settings",
    title: "Settings",
    href: "/admin/settings",
    icon: <Icon icon="solar:settings-outline" width={20} height={20} />,
  },
];
