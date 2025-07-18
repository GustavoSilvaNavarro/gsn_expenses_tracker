import { Database, getModelByName, Resource } from '@adminjs/prisma';
import { URL_PREFIX } from '@config';
import { prisma } from '@plugins';
import type { PrismaClient } from '@prisma/client';
import { AdminJS } from 'adminjs';

AdminJS.registerAdapter({ Database, Resource });

export const setupAdminJs = () => {
  const adminJs = new AdminJS({
    version: { admin: true },
    branding: { logo: '', companyName: 'GSN Expenses Tracker Service' },
    // loginPath: URL_PREFIX ? `/${URL_PREFIX}/admin/login` : '/admin/login',
    resources: [
      { resource: { model: getModelByName('Households') as PrismaClient['households'], client: prisma } },
      { resource: { model: getModelByName('Users') as PrismaClient['users'], client: prisma } },
      { resource: { model: getModelByName('Categories') as PrismaClient['categories'], client: prisma } },
      { resource: { model: getModelByName('Expenses') as PrismaClient['expenses'], client: prisma } },
    ],
    rootPath: URL_PREFIX ? `/${URL_PREFIX}/admin` : '/admin',
    settings: { defaultPerPage: 100 },
  });

  return adminJs;
};
