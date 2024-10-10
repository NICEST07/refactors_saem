import { Link } from '@src/config/i18n/routing'
import { MenuButton, Separator, SideBar, SideBarProvider } from './context'
import { NAV_ITEMS } from './nav-items'

const blackListIDS = ['reseller', 'API', 'C2M', 'Bots']

export function SideBarContainer () {
  return (
    <SideBarProvider>
      <header className='w-full h-16 fixed bg-white shadow-md box-border' />
      <SideBar>
        <nav className='flex flex-col flex-grow overflow-hidden'>
          <MenuButton />
          <Separator />
        </nav>
        <ul>
          {NAV_ITEMS.map(({ id, title, icon, path, subMenu, subMenuItems }) => (
            <li key={id} className={blackListIDS.includes(id) ? 'hidden' : ''}>
              <Link href={path} className='flex items-center gap-2'>
                {icon}
                <span>{title}</span>
              </Link>
              {subMenu && (
                <ul>
                  {subMenuItems.map(({ id, title }) => (
                    <li key={id} className={blackListIDS.includes(id) ? 'hidden' : ''}>
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </SideBar>
    </SideBarProvider>
  )
}
