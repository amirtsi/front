import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({
  onClick,
  children,
  className,
  isActive,
  activeIndicator,
  icon,
  disabled = false,
  iconPosition,
  includeTextField = true,
  buttonText,
  type = 'button',
  ...otherProps
}) => {
  const flexDirection = iconPosition === 'left' ? 'row-reverse' : 'row';
  const spacing = icon ? 'ml-2' : '';

  return (
    <button
      type={type}
      onClick={onClick} {...otherProps}
      className={`relative flex items-center p-2 rounded-md ${className}`}
      disabled={disabled}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        backgroundColor: disabled ? '#ccc' : '',
      }}
    >
      {isActive && activeIndicator}

      <div className={`flex items-center justify-center space-x-2 ${flexDirection}`}>
        {icon && iconPosition === 'left' && (
          <span className={`order-1 ${isActive ? 'ml-6' : 'mr-2'}`}>{icon}</span>
        )}

        {includeTextField && (
          <span className={`order-2 text-center ${spacing}`}>{buttonText}</span>
        )}

        {children}

        {icon && iconPosition === 'right' && (
          <span className={`order-3 ${isActive ? 'mr-6' : 'ml-2'}`}>{icon}</span>
        )}
      </div>
    </button>
  );
};

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  activeIndicator: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  includeTextField: PropTypes.bool,
  buttonText: PropTypes.string,
  type: PropTypes.string,
};

export default ActionButton;
