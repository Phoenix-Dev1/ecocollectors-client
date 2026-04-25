import { Link } from 'react-router-dom';

// set row color per status
export function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'bg-yellow-300'; // awaits recycler
    case 2:
      return 'bg-purple-300'; // awaits user approvel
    case 3:
      return 'bg-green-300'; // Completed
    case 4:
      return 'bg-red-300'; // canceled
    case 5:
      return 'bg-blue-300'; // awaits recycler pickup
    default:
      return '';
  }
}

// Buttons rendering
export function renderButtons(
  status,
  requestId,
  handleAccept,
  handleDecline,
  handleCancel,
  openModal
) {
  const baseClass = "px-4 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 whitespace-nowrap shadow-sm";
  
  switch (status) {
    case 1:
      return (
        <>
          <Link 
            to={`/user/update-request?Id=${requestId}`}
            className={`${baseClass} bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20`}
          >
            Update
          </Link>
          <button
            onClick={() => handleCancel(requestId)}
            className={`${baseClass} bg-red-500 hover:bg-red-600 text-white shadow-red-500/20`}
          >
            Cancel Request
          </button>
        </>
      );
    case 2:
      return (
        <>
          <button
            onClick={() => handleAccept(requestId)}
            className={`${baseClass} bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20`}
          >
            Accept
          </button>
          <button
            onClick={() => handleDecline(requestId)}
            className={`${baseClass} bg-red-500 hover:bg-red-600 text-white shadow-red-500/20`}
          >
            Decline
          </button>
        </>
      );
    case 3:
      return (
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
          Completed
        </span>
      );
    case 4:
      return (
        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
          Canceled
        </span>
      );
    case 5:
      return (
        <>
          <button
            onClick={openModal}
            className={`${baseClass} bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20`}
          >
            Accept & Close
          </button>
          <button
            onClick={() => handleDecline(requestId)}
            className={`${baseClass} bg-red-500 hover:bg-red-600 text-white shadow-red-500/20`}
          >
            Cancel Pickup
          </button>
        </>
      );
    default:
      return null;
  }
}

export function validateInputs({
  fullName,
  reqAddress,
  phoneNumber,
  bottlesNumber,
  fromTime,
  toTime,
}) {
  if (!/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/.test(fullName)) {
    return {
      isValid: false,
      message: 'Please enter a valid name.',
    };
  }

  if (reqAddress === '') {
    return {
      isValid: false,
      message: 'Please enter a valid address.',
    };
  }

  if (!/^\d{10}$/.test(phoneNumber.replace(/\s/g, ''))) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number.',
    };
  }

  if (!/^\d+$/.test(bottlesNumber) || /\s/.test(bottlesNumber)) {
    return {
      isValid: false,
      message: 'Please enter a valid number of bottles.',
    };
  }

  if (fromTime >= toTime) {
    return {
      isValid: false,
      message: 'Please select a valid time range.',
    };
  }

  return {
    isValid: true,
    message: 'Inputs are valid.',
  };
}

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
