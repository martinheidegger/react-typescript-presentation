import classNames from 'classnames'

export const ExtendedButton = (props) => {
  const { children, className, ...rest } = props
  const onClick = (e) => {
    console.log(e)
  }
  return (
    <button
      onClick={onClick}
      className={classNames('extended-button', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
