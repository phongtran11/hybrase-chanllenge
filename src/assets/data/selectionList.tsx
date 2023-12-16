import { UserIcon, UsersIcon, UserGroupIcon } from "@heroicons/react/24/solid";
export const selectionList = [
  {
    id: "modal--basic-modal",
    title: "Basic",
    description: "Subscribe to our Basic Plan",
    icon: <UserIcon className="w-6 h-6 text-primary" />,
    type: "basic",
  },
  {
    id: "modal--premium-modal",
    title: "Premium",
    description: "Subscribe to our Premium Plan",
    icon: <UserGroupIcon className="w-6 h-6 text-secondary" />,
    type: "premium",
  },
  {
    id: "modal--standard-modal",
    title: "Standard",
    description: "Subscribe to our Standard Plan",
    icon: <UsersIcon className="w-6 h-6 text-accent" />,
    type: "standard",
  },
] as const;
