export const listLanguage = [
  {
    value: "en",
    name: "English",
  },
  {
    value: "vi",
    name: "VietNam",
  },
];
export const dataMenu = [
  { id: "1", name: "Forms", href: "/dashboard/forms" },
  { id: "2", name: "Account", href: "/dashboard/account" },
  {
    id: "3",
    name: "Browse",
    children: [
      { id: "c1", name: "Course", href: "/dashboard/course" },
      { id: "c2", name: "Seminar", href: "/dashboard/seminar" },
      { id: "c3", name: "Video", href: "/dashboard/video" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      {
        id: "d1",
        name: "Alice",
        href: "#",
      },
      { id: "d2", name: "Bob", href: "#" },
      { id: "d3", name: "Charlie", href: "#" },
    ],
  },
];
