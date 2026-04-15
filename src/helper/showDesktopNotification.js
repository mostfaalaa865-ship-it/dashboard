export default function showDesktopNotification(title, body) {
    if (!("Notification" in window)) return;
    console.log('first')
    if (Notification.permission === "granted") {
            new Notification("New Message", {
                body: body,
                icon: "/logo.png",
                tag: "chat-message"
              })
    }
  }