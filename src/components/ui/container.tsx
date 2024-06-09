import { type ComponentPropsWithRef, type ReactNode } from 'react'

const alignments = {
  center: 'flex flex-col justify-center items-center',
  default: ''
}

interface ContainerProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode
  alignment?: keyof typeof alignments
}

const Container = ({ children, alignment = 'default', ...props }: ContainerProps) => {
  return (
    <div {...props} className={`${alignments[alignment]} h-full pt-4 padding-calc w-full p-4`}>
      {children}
    </div>
  )
}

export default Container