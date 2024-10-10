import { Link } from '@src/config/i18n/routing'
import { SideBarProvider, SideBar, MenuButton, Separator } from '@src/core/components/side-bar/context'
import { NAV_ITEMS } from '@src/core/components/side-bar/nav-items'
import { ChevronDown } from 'lucide-react'

// const blackListIDS = ['reseller', 'API', 'C2M', 'Bots']

export default function MainLayout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBarProvider>
        <header className='w-full h-16 fixed bg-white shadow-md box-border' />
        <SideBar>
          <nav className='flex flex-col flex-grow overflow-hidden'>
            <MenuButton />
            <Separator />
            <ul className='flex flex-col gap-2 pt-4 overflow-hidden overflow-y-auto select-none'>
              {NAV_ITEMS.map(({ id, title, icon, path, subMenu }) => (
                <ListItem
                  key={id}
                  path={path}
                  title={title}
                  icon={icon}
                  subMenu={subMenu}
                  as={!subMenu ? Link : 'div'}
                  href={!subMenu ? path : undefined}
                />
              ))}
            </ul>
          </nav>
        </SideBar>
      </SideBarProvider>
      <main className='pl-14 pt-20'>
        {children}
      </main>
    </>
  )
}

type ListItemProps<T extends React.ElementType> = {
  as?: T
  title: string
  icon: React.ReactNode
  subMenu: boolean
  path?: string
} & React.ComponentPropsWithoutRef<T>

function ListItem<T extends React.ElementType = 'div'> ({ as, icon, title, subMenu, ...props }: ListItemProps<T>) {
  const Comp = as ?? 'div'
  return (
    <li>
      <Comp className='flex items-center gap-2' {...props}>
        <span className='truncate text-lg align-middle'>
          {icon}
        </span>
        <span className='truncate text-lg align-middle '>
          {title}
        </span>
        {subMenu && (
          <span className='ml-auto text-lg align-middle'>
            <ChevronDown className='w-7 h-7' />
          </span>
        )}
      </Comp>
    </li>
  )
}
