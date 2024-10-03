
export function Separator ({ className }: { className?: string }) {
  return (
    <div className='flex items-center text-palette-icons w-full after:content-[""] before:content-[""] before:flex-1 before:border-y after:flex-1 after:border-y before:mx-2 after:mx-2'>
      <svg width='1em' height='1em' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
      </svg>
    </div>
  )
}
