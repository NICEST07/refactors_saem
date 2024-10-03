import { Repeat2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { useSendCode } from '@src/core/hooks/use-send-codes'

export function ReSendCode ({ title = '', initalCount = 30, fetcher }: { title?: string, initalCount?: number, fetcher: () => Promise<void> }) {
  const { handleReSendEmailCode, loading, count, isStartCount } = useSendCode({ fetcher })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
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
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
