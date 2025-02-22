import Link from "next/link";

function UserReportList({ userInfo, index, handleDetailsPage }) {

  const { email, username, phone_number, user_type, first_name, last_name, post_office, created_at, gender, nid, is_active, importance, isOnline, id } = userInfo;





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
        {index}

      </td>
      <td className="py-2 px-3 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <h4 className="font-semibold dark:text-white">
            {first_name && last_name ? `${first_name} ${last_name}` : "N/A"}
          </h4>

        </div>
      </td>
      <td className="py-2 px-3 text-sm text-gray-500"> {user_type ? `${user_type}` : "N/A"}</td>
      <td className="py-2 px-3 text-sm text-gray-500">  <div className="text-base">
        {post_office ? `${post_office}` : "N/A"}
      </div></td>

      <td className="py-2 px-3 text-sm text-gray-500">{phone_number ? `${phone_number}` : "N/A"}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{(email)}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{formatDate(created_at)}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{gender ? `${gender}` : "N/A"}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{nid ? `${nid}` : "N/A"}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{is_active ? "Active" : "Inactive"}</td>
      <td className="py-2 px-3 text-sm text-gray-500">
        <Link onClick={() => handleDetailsPage(id, user_type)} href="/user-details-report" className={`flex justify-center items-center p-2 rounded-md font-semibold bg-green-500  text-white ${isOnline ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}`}>
          Details
        </Link>
      </td>
      {/* <td className="py-4 px-3 text-sm text-gray-500 rounded-r-lg">
        <button aria-label="More options" className="p-1">
          <StatusIcon />
        </button>
      </td> */}
    </tr>
  );
}



export default UserReportList;
