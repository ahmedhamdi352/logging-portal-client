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
    roles: ['manger', 'employee'],
    children: [
      {
        key: 'logs/all',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'All Logs',
        roles: ['manger', 'employee',],
      },
      {
        key: 'log',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'Add Log',
        roles: ['manger', 'employee',],
      },
    ]
  },

  {
    key: 'project',
    label: 'sidebar.Dashboard',
    leftIcon: 'fas fa-list',
    text: 'Project Allocation',
    roles: ['admin', 'manger'],
    children: [
      {
        key: 'project-types',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-flag',
        text: 'Project Types',
        roles: ['admin']
      },
      {
        key: 'projects',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-receipt',
        text: 'Projects',
        roles: ['admin']
      },
      {
        key: 'add-allocation',
        label: 'sidebar.Dashboard',
        leftIcon: 'fas fa-calendar',
        text: 'Add Allocation',
        roles: ['admin', 'manger']
      },
    ]
  },

  {
    key: 'team',
    roles: ['manger', 'admin'],
    label: 'sidebar.Dashboard',
    leftIcon: 'fas fa-users',
    text: 'Mange Team',
  },

  {
    key: 'setting',
    roles: ['manger', 'employee', 'admin'],
    label: 'sidebar.Dashboard',
    leftIcon: 'fas fa-unlock',
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
