import NotificationCard from "./NotificationsCard";

const Notification = () => {
  return (
    <section className="bg-Light w-full">
      <div className="bg-dim flex justify-between px-6 py-6">
        <p className="title">Notifications</p>
        <button className="text-base font-medium">Clear All</button>
      </div>

      <div id="renderNotifications" className="px-2 py-4">
        <NotificationCard />
      </div>
    </section>
  );
};

export default Notification;
