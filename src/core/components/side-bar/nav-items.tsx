import { Flag, HandHelping, Home, Package, UserRoundCog } from 'lucide-react'

export interface BaseRoute {
  id: string
  title: string
  icon?: React.ReactNode
  path: string
}

interface SubMenuRoute extends BaseRoute {
  subMenu: true
  subMenuItems: Route[]
}

interface NoSubMenuRoute extends BaseRoute {
  subMenu: false
  subMenuItems?: never
}

export type Route = SubMenuRoute | NoSubMenuRoute

const SIZE = 'w-7 h-7'

export const NAV_ITEMS: Route[] = [
  {
    id: 'dashboard',
    title: 'dashboard',
    icon: <Home className={SIZE} />,
    path: '/dashboard',
    subMenu: false
  },
  {
    id: 'services',
    title: 'services',
    icon: <Flag className={SIZE} />,
    path: 'services',
    subMenu: true,
    subMenuItems: [
      {
        id: 'C2M',
        title: 'c2m',
        path: '/services/contact2me',
        subMenu: false
      },
      {
        id: 'SMS',
        title: 'sms',
        path: '/services/sms',
        subMenu: false
      },
      {
        id: 'CallBlasting',
        title: 'blasting',
        path: '/services/callblasting',
        subMenu: false
      },
      {
        id: 'Email',
        title: 'mail',
        path: '/services/mail',
        subMenu: false
      },
      {
        id: 'HlrLookup',
        title: 'hlr',
        path: '/services/hlr-lookup',
        subMenu: false
      },
      {
        id: 'Bots',
        title: 'bot',
        path: '/services/bots',
        subMenu: false
      },
      {
        id: 'API',
        title: 'api',
        path: '/services/api',
        subMenu: false
      }
    ]
  },
  { // Resources es un modal que se debe invocar desde cualquier parte de la aplicación
    id: 'resources',
    title: 'resources',
    icon: <Package className={SIZE} />,
    path: 'resources',
    subMenu: false
  },
  {
    id: 'reseller',
    title: 'admin',
    icon: <UserRoundCog className={SIZE} />,
    path: 'admin',
    subMenu: true,
    subMenuItems: [
      {
        id: '',
        title: 'users',
        path: '/admin/users',
        subMenu: false
      },
      {
        id: '',
        title: 'rates',
        path: '/admin/rates',
        subMenu: false
      },
      {
        id: '',
        title: 'config',
        path: '/admin/configuration',
        subMenu: false
      }
    ]
  },
  { // Support son modales
    id: 'support',
    title: 'support',
    path: 'support',
    icon: <HandHelping className={SIZE} />,
    subMenu: true,
    subMenuItems: [
      {
        id: '',
        title: 'newTicket',
        path: '#',
        subMenu: false
      },
      {
        id: '',
        title: 'tickets',
        path: '#',
        subMenu: false
      }
    ]
  }
]
