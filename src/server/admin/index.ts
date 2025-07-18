import { URL_PREFIX } from '@config';
import { AdminJS } from 'adminjs';
// import { prisma } from '@plugins';
// import { getModelByName } from '@adminjs/prisma'

export const setupAdminJs = () => {
  const adminJs = new AdminJS({
    version: { admin: true },
    branding: { logo: '', companyName: 'GSN Expenses Tracker Service' },
    // loginPath: URL_PREFIX ? `/${URL_PREFIX}/admin/login` : '/admin/login',
    resources: [],
    rootPath: URL_PREFIX ? `/${URL_PREFIX}/admin` : '/admin',
    settings: { defaultPerPage: 100 },
  });

  return adminJs;
};
