export default function formatDate(date) {
  const d = new Date(date);
  return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}