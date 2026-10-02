import { X } from "lucide-react";

function ModalShell({
  title,
  description,
  icon: Icon,
  children,
  onClose,
  maxWidth = "520px",
}) {
  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-card"
        style={{ maxWidth }}
      >
        <div className="modal-header">
          <div className="modal-heading">
            {Icon && (
              <div className="modal-icon">
                <Icon size={19} />
              </div>
            )}

            <div>
              <h2>{title}</h2>

              {description && (
                <p>{description}</p>
              )}
            </div>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalShell;