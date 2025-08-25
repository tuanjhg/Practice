interface TruemoveLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  iconOnly?: boolean
  variant?: 'default' | 'white'
}

export function TruemoveLogo({ 
  size = 'md', 
  showText = true, 
  className = '', 
  iconOnly = false,
  variant = 'default'
}: TruemoveLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }

  const textColor = variant === 'white' ? 'text-white' : 'text-[#A6192E]'

  if (iconOnly) {
    return (
      <div className={`${sizeClasses[size]} bg-[#A6192E] rounded transform rotate-12 flex items-center justify-center ${className}`}>
        <div className={`${iconSize[size]} bg-white rounded-sm`}></div>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-[#A6192E] rounded transform rotate-12 flex items-center justify-center`}>
        <div className={`${iconSize[size]} bg-white rounded-sm`}></div>
      </div>
    </div>
  )
}