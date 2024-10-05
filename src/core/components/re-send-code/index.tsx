'use client'
import { Repeat2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { useSendCode } from '@src/core/hooks/use-send-codes'
import { Button } from '../ui/button'

export function ReSendCode ({ title = '', fetcher }: { title?: string, fetcher: () => Promise<void> }) {
  const { handleReSendEmailCode, loading, count, isStartCount } = useSendCode({ fetcher })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            onClick={handleReSendEmailCode}
            disabled={isStartCount || loading}
            className={`text-palette-primary  p-2 rounded-full text-lg ${!isStartCount ? 'hover:bg-palette-primary/20' : ''}`}
            type='button'
          >
            {isStartCount
              ? (
                <span className='text-base'>
                  {count}
                </span>
                )
              : <Repeat2 className={`text-palette-primary ${loading || isStartCount ? 'text-gray-600' : ''}`} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
