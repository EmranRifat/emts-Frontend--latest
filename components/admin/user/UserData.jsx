import Link from "next/link";
import Image from "next/image";

function UserData({ userInfo, index, refetch }) {
  const {
    email,
    username,
    phone_number,
    user_type,
    first_name,

    last_name,
    post_office,
    created_at,
    gender,
    nid,
    is_active,
    importance,
    isOnline,
  } = userInfo;

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Icon component for reusability
  const StatusIcon = ({ fill = "#94A3B8" }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" stroke={fill} strokeWidth="2" />
    </svg>
  );

  return (
    <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}`}>
      <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-200 rounded-l-lg">
        <StatusIcon fill={importance === "gold" ? "#F6A723" : "#94A3B8"} />
      </td>
      <td className="py-4 px-3 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <h4 className="font-bold text-lg dark:text-white">{first_name}{last_name}</h4>
          <div className="text-base">
            {post_office} • {phone_number} • {user_type}
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-sm text-gray-500">{(email)}</td>
      <td className="py-4 px-3 text-sm text-gray-500">{formatDate(created_at)}</td>
      <td className="py-4 px-3 text-sm text-gray-500">{gender}</td>
      <td className="py-4 px-3 text-sm text-gray-500">{nid}</td>
      <td className="py-4 px-3 text-sm text-gray-500">{is_active ? "Active" : "Inactive"}</td>
      <td className="py-4 px-3 text-sm text-gray-500">
        <Link href="/messages" className={`flex justify-center items-center p-2 rounded-md font-semibold text-white ${isOnline ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}`}>
          Message
        </Link>
      </td>
      <td className="py-4 px-3 text-sm text-gray-500 rounded-r-lg">
        <button aria-label="More options" className="p-1">
          <StatusIcon />
        </button>
      </td>
    </tr>
  );
}

export default UserData;
