import ReLifeFeed from "./ReLifeFeed";
const renderScreen = () => {
  switch (currentScreen) {
    case "home":
      return <ReLifeFeed />;
    case "explore":
      return <ExploreScreen />;
    case "create":
      return <CreateScreen />;
    case "notifications":
      return <NotificationsScreen />;
    case "profile":
      return <ProfileScreen />;
    default:
      return <ReLifeFeed />;
  }
};
