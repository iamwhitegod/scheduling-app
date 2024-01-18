import "./Modal.css";
import React from "react";
import { X } from "@phosphor-icons/react";
import PropTypes from "prop-types";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="btn modal__close" onClick={onClose}>
          <X weight="regular" size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default React.memo(Modal);
