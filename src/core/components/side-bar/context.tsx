'use client'
import { Menu } from 'lucide-react'
import { createContext, useContext, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { useOnClickOutside } from '@src/core/hooks/use-click-outside'

interface ISideBarContext {
  open: boolean
  handleToogle: () => void
  handleClose: () => void
}

export const SideBarContext = createContext<ISideBarContext>({
  open: false,
  handleToogle: () => {},
  handleClose: () => {}
})

export function SideBarProvider ({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleToogle = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  return (
    <SideBarContext.Provider value={{ open, handleToogle, handleClose }}>
      {children}
    </SideBarContext.Provider>
  )
}

export function SideBar ({ children }: { children: React.ReactNode }) {
  const { open, handleClose } = useSideBar()
  const asideRef = useRef<HTMLElement>(null)
  useOnClickOutside(asideRef, handleClose)
  return (
    <aside ref={asideRef} className={`${open ? 'w-72' : 'w-12'} p-5 hidden py-4 top-0 duration-300 bg-palette-primary fixed z-50 h-screen overflow-hidden sm:flex px-0.5 flex-col text-white`}>
      {children}
    </aside>
  )
}

export function MenuButton ({ className }: { className?: string }) {
  const { handleToogle } = useSideBar()

  return (
    <Button
      className={`hover:bg-palette-primary-800 hover:text-white p-1 rounded-md w-fit px-1.5 mb-2 sm:flex ${className}`}
      onClick={handleToogle}
    >
      <Menu className='w-8 h-8' />
    </Button>
  )
}

export function Separator () {
  return (
    <hr className='w-11/12 border-t-palette-secondary mx-auto my-1' />
  )
}

export function useSideBar () {
  const context = useContext(SideBarContext)
  if (context === undefined) {
    throw new Error('useSideBar must be used within a SideBarProvider')
  }
  return context
}
