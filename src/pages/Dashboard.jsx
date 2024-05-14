// import DashCard from "@/components/Dashboard-components/dash-card";
// import HeadingNav from "@/components/heading-nav";
// import { Box } from "@mui/material";

// const Dashboard = () => {
//   return (
//     <Box width="100%" >
//       <HeadingNav
//         navLinks={[
//           {
//             link: "/dash",
//             label: "Dashboard",
//           },
//         ]}
//       />

//       <DashCard
//         items={[
//           {
//             label: "Amounts",
//           },
//           {
//             label: "Users",
//           },
//           {
//             label: "Demo",
//           },
//           {
//             label: "Some Things",
//           },
//         ]}
//       />
//     </Box>
//   );
// };

// export default Dashboard;
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      </div>
    )
  );
};

export default Profile;
