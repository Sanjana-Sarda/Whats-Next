import * as inputStyles from './input.module.css'
import classNames from 'classnames'
import Cleave from 'cleave.js/react'
import * as icons from 'react-icons/fi'
import React, { forwardRef } from 'react'
import propTypes from 'prop-types'

const allowedIcons = Object.keys(icons).map(icon => icon.substr(2))

const Input = ({ icon, type, tabBefore, format, tabAfter, value, style, defaultValue, loading, inline, innerRef, ...otherProps }) => {
  const Icon = icon && icons[`Fi${icon}`]
  const classes = classNames(
    inputStyles.root,
    { [inputStyles.inline]: inline },
    { [inputStyles.loading]: loading },
    { [inputStyles.inputWithIcon]: !!icon }
  )
  return (
    <div className={classes} style={style}>
      {Icon && <Icon />}
      {tabBefore && (
        <div className={inputStyles.tabBefore}>{tabBefore}</div>
      )}
      <Cleave {...otherProps} type={type} value={value || defaultValue} htmlRef={htmlRef => { if (innerRef) innerRef.current = htmlRef }} options={format} />
      {tabAfter && (
        <div className={inputStyles.tabAfter}>{tabAfter}</div>
      )}
      {loading && <div className={inputStyles.loadingIcon} /> }
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  format: {}
}

Input.propTypes = {
  /** The input type (must be text-based, not submit, checkbox etc) */
  type: propTypes.oneOf(['text', 'tel', 'email', 'password', 'color', 'number', 'search', 'url', 'time']),
  /** Whether to show an icon - see https://goo.gl/3wa4RG (ignore Fi prefix) */
  icon: propTypes.oneOf(allowedIcons),
  /** Sets display to inline-block */
  inline: propTypes.bool,
  /** Content to be displayed before the input */
  tabBefore: propTypes.oneOfType([propTypes.node, propTypes.string]),
  /** Content to be displayed after the input */
  tabAfter: propTypes.oneOfType([propTypes.node, propTypes.string]),
  /** the auto formatting options, see: https://github.com/nosir/cleave.js/blob/master/doc/options.md */
  format: propTypes.object,
  /** Whether to show a loading spinner */
  loading: propTypes.bool
}

// eslint-disable-next-line
export default forwardRef((props, ref) => <Input {...props} innerRef={ref} />)