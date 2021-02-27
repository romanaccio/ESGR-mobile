import getSystemLocale from './systemLocale';

// unfortunatly this only works on iOS
// export default function formatDateTime(timestamp) {
//   const d = new Date(timestamp);
//   const time = new Intl.DateTimeFormat(getSystemLocale, {
//     dateStyle: 'long',
//     timeStyle: 'short',
//   }).format(d);
//   return time;
// }

export default function formatDateTime(timestamp) {
  const loc = getSystemLocale();
  const d = new Date(timestamp);
  const time = d.toLocaleDateString(loc) + ' ' + d.toLocaleTimeString(loc);
  return time;
}
