export const formattedTime = (created_at) => {
  return new Date(created_at)
    .toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .split(",")
    .join(" - ");
}