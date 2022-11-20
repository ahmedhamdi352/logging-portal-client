// import getDevSidebar from "../../customApp/sidebar";

const options = [
  // {
  //   key: '',
  //   label: 'sidebar.Dashboard',
  //   leftIcon: 'far fa-chart-bar',
  //   text: 'Dashboard',
  // },
  // {
  //   key: "clients",
  //   text: "Clients",
  //   label: "sidebar.Clients",
  //   leftIcon: "fas fa-users",
  //   children: [
  //     {
  //       key: "clients",
  //       label: "sidebar.viewClients",
  //       text: "View Clients"
  //     },
  //     {
  //       key: "clients/new",
  //       label: "sidebar.addNewClient",
  //       text: "Add New Client"
  //     }
  //   ]
  // }

  // {
  //   key: 'new',
  //   label: 'sidebar.Dashboard',
  //   leftIcon: 'fas fa-plus',
  //   text: 'Add New Document',
  // },
  // {
  //   key: 'company',
  //   text: 'Receivers',
  //   label: 'sidebar.Clients',
  //   leftIcon: 'fas fa-building',
  //   children: [
  //     {
  //       key: 'company/new',
  //       label: 'sidebar.Dashboard',
  //       leftIcon: 'fas fa-building',
  //       text: 'Add New Receiver',
  //     },
  //   ],
  // },
  // {
  //   key: 'company/new',
  //   label: 'sidebar.Dashboard',
  //   leftIcon: 'fas fa-building',
  //   text: 'Add New Receiver',
  // },

  {
    key: 'log',
    label: 'sidebar.Dashboard',
    leftIcon: 'fas fa-receipt',
    text: 'Logging Time',
    children: [
      {
        key: 'logs/all',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'All Logs',
      },
      {
        key: 'log',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'Add Log',
      },
    ]
  },

  {
    key: 'project',
    label: 'sidebar.Dashboard',
    leftIcon: 'fas fa-receipt',
    text: 'Project Allocation',
    children: [
      {
        key: 'project-types',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'Project Types',
      },
      {
        key: 'projects',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'Projects',
      },
    ]
  },

  {
    key: 'setting',
    label: 'sidebar.Dashboard',
    leftIcon: 'fas fa-cog',
    text: 'change password',
  },

  // {
  //   key: "clients",
  //   text: "Clients",
  //   label: "sidebar.Clients",
  //   leftIcon: "fas fa-users",
  //   children: [
  //     {
  //       key: "clients",
  //       label: "sidebar.viewClients",
  //       text: "View Clients"
  //     },
  //     {
  //       key: "clients/new",
  //       label: "sidebar.addNewClient",
  //       text: "Add New Client"
  //     }
  //   ]
  // }
];
export default options;
