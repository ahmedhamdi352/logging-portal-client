export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const statuses = {
  pending: '#108ee9',
  inprocess: '#138D75',
  approved: '#87d068',
  rejected: '#C70039',
  postponed: '#FFC300',
  cancelled: '#FF5733',
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const ellipsis = (s, maxlimit) => {
  if (typeof s !== 'string') return '';
  return s.length > maxlimit ? s.substring(0, maxlimit - 3) + '...' : s;
};

export const formatePrice = (price, currency = 'EGP') => {
  if (typeof price !== 'number') return '';
  return price.toLocaleString('en-EG', { style: 'currency', currency: 'EGP' });
};

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateNumber = (number) => {
  var re = /^\d+$/;
  return re.test(String(number).toLowerCase());
};

export const appPermissions = {
  viewInvoices: 'view_invoices',
  submitInvoices: 'submit_invoices',
  addInvoices: 'add_invoices',
  deleteInvoices: 'delete_invoices',
  editInvoices: 'edit_invoices',
  viewInvoicesDetails: 'view_invoice_details',
  viewSettings: 'view_settings',
  updateSettings: 'update_settings',
  addUsers: 'add_users',
  deleteUsers: 'delete_users',
  updateUsers: 'update_users',
  assignUserRoles: 'assign_user_roles',
  manageRoles: 'manage_roles',
};
